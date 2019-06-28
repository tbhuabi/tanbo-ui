import {
  Component,
  Input,
  EventEmitter,
  OnInit,
  Output,
  Inject,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef, OnDestroy
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { UI_SELECT_ARROW_CLASSNAME } from '../help';
import {
  toDate,
  dateFormat,
  toDouble,
  Hours,
  Seconds,
  Minutes,
  Day,
  Month,
  Year,
  DateConfig,
  Time,
  DatePickerModel
} from './date-utils';

import { attrToBoolean } from '../../utils';

@Component({
  selector: 'ui-input[type=date]',
  templateUrl: './date.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: DateComponent,
    multi: true
  }]
})
export class DateComponent implements ControlValueAccessor, OnInit, OnChanges, OnDestroy {
  @ViewChild('hoursListWrap', {static: false, read: ElementRef}) hoursListWrap: ElementRef<HTMLDivElement>;
  @ViewChild('minutesListWrap', {static: false, read: ElementRef}) minutesListWrap: ElementRef<HTMLDivElement>;
  @ViewChild('secondsListWrap', {static: false, read: ElementRef}) secondsListWrap: ElementRef<HTMLDivElement>;
  @Output() uiChange = new EventEmitter<string | number>();
  @Input() position = 'bottomLeft';
  @Input() size = '';
  @Input() placeholder = '';
  @Input() forId: string;
  @Input() name: string;
  @Input() arrowIconClassName = '';
  @Input() displayFormat: string;
  @Input() format = 'yyyy-MM-dd';
  @Input() value: string | number | Date = '';
  @Input() maxDate: string | number | Date = '';
  @Input() minDate: string | number | Date = '';
  @Input() minTime: string;
  @Input() maxTime: string;

  @Input()
  set disabled(isDisabled: any) {
    this._disabled = attrToBoolean(isDisabled);
  }

  get disabled() {
    return this._disabled;
  }

  @Input()
  set readonly(isReadonly: any) {
    this._readonly = attrToBoolean(isReadonly);
  }

  get readonly() {
    return this._readonly;
  }

  get time() {
    return [
      this.config.hours && this.pickerDate.getHours(),
      this.config.minutes && this.pickerDate.getMinutes(),
      this.config.seconds && this.pickerDate.getSeconds()].filter(item => item).join(':');
  }

  config = new DateConfig();

  focus = false;
  open = false;

  minDateInstance: Date;
  maxDateInstance: Date;
  minTimeInstance = new Time('00:00:00');
  maxTimeInstance = new Time('24:00:00');
  systemDate: Date;
  pickerDate: Date = new Date();
  startYearIndex: number;

  years: Year[] = [];
  months: Month[] = [];
  dayGroups: Day[][] = [];
  hours: Hours[] = [];
  minutes: Minutes[] = [];
  seconds: Seconds[] = [];

  displayValue: any = '';

  oldModel: DatePickerModel;
  model: DatePickerModel = 'day';

  private _disabled = false;
  private _readonly = false;
  private onChange: (_: any) => any;
  private onTouched: () => any;
  private days: Array<Day> = [];

  private animateId: number;

  constructor(@Inject(UI_SELECT_ARROW_CLASSNAME) arrowIcon: string) {
    this.arrowIconClassName = arrowIcon;
    this.hours = Array.from({length: 24}).map((_, h) => {
      return {hours: h, disable: true};
    });
    this.minutes = Array.from({length: 60}).map((_, m) => {
      return {minutes: m, disable: true};
    });
    this.seconds = Array.from({length: 60}).map((_, s) => {
      return {seconds: s, disable: true};
    });
  }

  ngOnInit() {
    // 初始化日历组件，并缓存当前的年月日
    this.setupPicker();
  }

  ngOnChanges(changes: SimpleChanges): void {
    Object.keys(changes).forEach(key => {
      const value = changes[key].currentValue;
      switch (key) {
        case 'value':
          this.displayValue = dateFormat(this.value, this.displayFormat || this.format);
          this.pickerDate = toDate(value, false) || new Date();
          this.setupPicker();
          break;
        case 'minDate':
          this.minDateInstance = this.getNewDateByTime(toDate(value, false), this.minTimeInstance, true);
          this.setupPicker();
          break;
        case 'maxDate':
          this.maxDateInstance = this.getNewDateByTime(toDate(value, true), this.maxTimeInstance, false);
          this.setupPicker();
          break;
        case 'minTime':
          this.minTimeInstance.timeString = value || '00:00:00';
          if (this.minDateInstance) {
            this.minDateInstance = this.getNewDateByTime(this.minDateInstance, this.minTimeInstance, true);
          }
          this.setupPicker();
          break;
        case 'maxTime':
          this.maxTimeInstance.timeString = value || '24:00:00';
          if (this.maxDateInstance) {
            this.maxDateInstance = this.getNewDateByTime(this.maxDateInstance, this.maxTimeInstance, false);
          }
          this.setupPicker();
          break;
        case 'displayFormat':
          this.displayValue = dateFormat(this.pickerDate, value || this.format);
          this.config.formatString = this.displayFormat || this.format;
          this.updateView();
          break;
        case 'format':
          this.config.formatString = this.displayFormat || this.format;
          this.updateView();
          break;
      }
    });
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animateId);
  }

  setupPicker() {
    this.systemDate = new Date();
    this.startYearIndex = this.pickerDate.getFullYear() - this.pickerDate.getFullYear() % 32;
    this.update();
  }

  reset() {
    this.value = '';
    this.displayValue = '';
    if (this.onChange) {
      this.onChange('');
    }
    this.uiChange.emit('');
  }

  toggle() {
    if (this.disabled) {
      return;
    }
    this.focus = true;
    if (this.readonly) {
      return;
    }
    this.open = !this.open;
  }

  onEscape() {
    this.open = false;
    this.focus = false;
    if (this.onTouched) {
      this.onTouched();
    }
  }

  updateView() {
    if (this.config.dateModel) {
      if (this.config.day) {
        this.model = 'day';
      } else if (this.config.year) {
        this.model = 'year';
      } else if (this.config.month) {
        this.model = 'month';
      } else {
        this.model = null;
      }
    } else if (this.config.timeModel) {
      this.model = 'time';
      this.timePickerScrollToCenter();
    } else {
      this.model = null;
    }
  }

  switchModel(newModel: DatePickerModel) {
    this.oldModel = this.model;
    this.model = newModel;
    if (this.model === 'time') {
      this.timePickerScrollToCenter();
    }
  }

  check() {
    this.open = false;
    const pickerDate = this.pickerDate;
    let value: any;
    if (this.format) {
      value = dateFormat(pickerDate, this.format);
    } else {
      value = pickerDate.getTime();
    }
    this.displayValue = dateFormat(pickerDate, this.displayFormat || this.format);
    this.value = value;
    if (this.onChange) {
      this.onChange(value);
    }
    this.uiChange.emit(value);
  }

  writeValue(value: any) {
    this.value = value;
    this.displayValue = dateFormat(this.value, this.displayFormat || this.format);
    this.pickerDate = toDate(value, false) || new Date();
    this.setupPicker();
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  toPreviousYear() {
    this.updatePickerByYear(this.pickerDate.getFullYear() - 1);
  }

  toNextYear() {
    this.updatePickerByYear(this.pickerDate.getFullYear() + 1);
  }

  toPrevMonth() {
    this.updatePickerByMonth(this.pickerDate.getMonth() - 1);
  }

  toNextMonth() {
    this.updatePickerByMonth(this.pickerDate.getMonth() + 1);
  }

  updateYearsByStart(year: number) {
    const a = this.minDateInstance ? year + 32 >= this.minDateInstance.getFullYear() : true;
    const b = this.maxDateInstance ? year <= this.maxDateInstance.getFullYear() : true;
    if (a && b) {
      this.startYearIndex = year;
      this.updateYearList();
    }
  }

  updatePickerByYear(year: number) {
    const month = this.pickerDate.getMonth();
    this.pickerDate.setFullYear(year);

    const newMonth = this.pickerDate.getMonth();
    if (newMonth > month) {
      this.pickerDate.setMonth(newMonth, 0);
    }
    this.insurePickerDateBetweenMinAndMax();
    this.update();
    if (this.config.day) {
      this.model = 'day';
    }
  }

  updatePickerByMonth(month: number) {
    const day = this.pickerDate.getDate();

    this.pickerDate.setMonth(month + 1, 0);

    if (day < this.pickerDate.getDate()) {
      this.pickerDate.setDate(day);
    }
    this.insurePickerDateBetweenMinAndMax();
    this.update();
    if (this.config.day) {
      this.model = 'day';
    }
  }

  updatePickerByDay(day: Day) {
    const date = day.date;
    this.pickerDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    this.insurePickerDateBetweenMinAndMax();
    this.update();
  }

  updatePickerByHours(hours: number) {
    this.pickerDate.setHours(hours);
    this.insurePickerDateBetweenMinAndMax();
    this.timePickerScrollToCenter();
    this.update();
  }

  updatePickerByMinutes(minutes: number) {
    this.pickerDate.setMinutes(minutes);
    this.insurePickerDateBetweenMinAndMax();
    this.timePickerScrollToCenter();
    this.update();
  }

  updatePickerBySeconds(seconds: number) {
    this.pickerDate.setSeconds(seconds);
    this.insurePickerDateBetweenMinAndMax();
    this.timePickerScrollToCenter();
    this.update();
  }

  private update() {
    this.updateYearList();
    this.updateMonthList();
    this.updateDayList();
    this.updateHoursList();
    this.updateMinutesList();
    this.updateSecondsList();
  }

  private timePickerScrollToCenter() {
    cancelAnimationFrame(this.animateId);
    this.animateId = requestAnimationFrame(() => {
      const h = this.pickerDate.getHours();
      const m = this.pickerDate.getMinutes();
      const s = this.pickerDate.getSeconds();
      const options: ScrollIntoViewOptions = {
        block: 'center',
        behavior: 'auto'
      };
      if (this.hoursListWrap) {
        this.hoursListWrap.nativeElement.children[h].scrollIntoView(options);
      }
      if (this.minutesListWrap) {
        this.minutesListWrap.nativeElement.children[m].scrollIntoView(options);
      }
      if (this.secondsListWrap) {
        this.secondsListWrap.nativeElement.children[s].scrollIntoView(options);
      }
    });
  }

  private updateSecondsList() {
    this.seconds.forEach(item => {
      item.disable = !this.canSelectSeconds(item.seconds);
    });
  }

  private updateMinutesList() {
    this.minutes.forEach(item => {
      item.disable = !this.canSelectMinutes(item.minutes);
    });
  }

  private updateHoursList() {
    this.hours.forEach(item => {
      item.disable = !this.canSelectHours(item.hours);
    });
  }

  private updateDayList() {
    this.days = [];
    // 通过当前时间初始化date对象
    const dateInstance: Date = new Date(this.pickerDate.getFullYear(), this.pickerDate.getMonth(), 1, 0, 0, 0, 0);

    let start = -dateInstance.getDay() + 1;
    const end = 42 + start;

    const year = this.pickerDate.getFullYear();
    const month = this.pickerDate.getMonth();

    for (; start < end; start++) {
      const date = new Date(year, month, start, 0, 0, 0, 0);
      const day = date.getDate();
      this.days.push({
        date,
        disable: !this.canSelectDay(date),
        day
      });
    }

    this.dayGroups = [];
    let child: Array<Day> = [];
    for (let i = 0; i < this.days.length; i++) {
      if (i % 7 === 0) {
        child = [];
        this.dayGroups.push(child);
      }
      child.push(this.days[i]);
    }
  }

  private updateMonthList() {
    this.months = [];
    for (let i = 0; i < 12; i++) {
      this.months.push({
        month: i,
        disable: !this.canSelectMonth(i)
      });
    }
  }

  private updateYearList() {
    let startIndex = this.startYearIndex;
    this.years = [];
    const endIndex = startIndex + 32;
    while (startIndex < endIndex) {
      this.years.push({
        year: startIndex,
        disable: !this.canSelectYear(startIndex)
      });
      startIndex++;
    }
  }

  private canSelectSeconds(seconds: number) {
    const pickerDate = this.pickerDate;
    const minDate = this.minDateInstance;
    const maxDate = this.maxDateInstance;
    const minTime = this.minTimeInstance;
    const maxTime = this.maxTimeInstance;

    const date = Number(
      pickerDate.getFullYear() +
      toDouble(pickerDate.getMonth()) +
      toDouble(pickerDate.getDate()) +
      toDouble(pickerDate.getHours()) +
      toDouble(pickerDate.getMinutes()) +
      toDouble(seconds));

    const time = Number(pickerDate.getHours() + toDouble(pickerDate.getMinutes()) + toDouble(seconds));
    const min = Number(minTime.hours + toDouble(minTime.minutes) + toDouble(minTime.seconds));
    const max = Number(maxTime.hours + toDouble(maxTime.minutes) + toDouble(maxTime.seconds));

    const lessIsMore = min > max;

    const isLessThanMinDate = minDate ? date >= Number(
      minDate.getFullYear() +
      toDouble(minDate.getMonth()) +
      toDouble(minDate.getDate()) +
      toDouble(minDate.getHours()) +
      toDouble(minDate.getMinutes()) +
      toDouble(minDate.getSeconds())) : true;

    const isLessThanMinTime = lessIsMore ? (time >= min && time < 240000) : time >= min;

    const isMoreThanMaxDate = maxDate ? date <= Number(
      maxDate.getFullYear() +
      toDouble(maxDate.getMonth()) +
      toDouble(maxDate.getDate()) +
      toDouble(maxDate.getHours()) +
      toDouble(maxDate.getMinutes()) +
      toDouble(maxDate.getSeconds())) : true;

    const isMoreThanMaxTime = lessIsMore ? (time <= max && max >= 0) : time <= max;

    return isLessThanMinDate && isLessThanMinTime && isMoreThanMaxDate && isMoreThanMaxTime;
  }

  private canSelectMinutes(minutes: number) {
    const pickerDate = this.pickerDate;
    const minDate = this.minDateInstance;
    const maxDate = this.maxDateInstance;
    const minTime = this.minTimeInstance;
    const maxTime = this.maxTimeInstance;

    const date = Number(
      pickerDate.getFullYear() +
      toDouble(pickerDate.getMonth()) +
      toDouble(pickerDate.getDate()) +
      toDouble(pickerDate.getHours()) +
      toDouble(minutes));

    const time = Number(pickerDate.getHours() + toDouble(minutes));
    const min = Number(minTime.hours + toDouble(minTime.minutes));
    const max = Number(maxTime.hours + toDouble(maxTime.minutes));

    const lessIsMore = min > max;

    const isLessThanMinDate = minDate ? date >= Number(
      minDate.getFullYear() +
      toDouble(minDate.getMonth()) +
      toDouble(minDate.getDate()) +
      toDouble(minDate.getHours()) +
      toDouble(minDate.getMinutes())) : true;

    const isLessThanMinTime = lessIsMore ? (time >= min && time < 2400) : time >= min;

    const isMoreThanMaxDate = maxDate ? date <= Number(
      maxDate.getFullYear() +
      toDouble(maxDate.getMonth()) +
      toDouble(maxDate.getDate()) +
      toDouble(maxDate.getHours()) +
      toDouble(maxDate.getMinutes())) : true;

    const isMoreThanMaxTime = lessIsMore ? (time <= max && max >= 0) : time <= max;

    return isLessThanMinDate && isLessThanMinTime && isMoreThanMaxDate && isMoreThanMaxTime;
  }

  private canSelectHours(hours: number) {
    const pickerDate = this.pickerDate;
    const minDate = this.minDateInstance;
    const maxDate = this.maxDateInstance;
    const minTime = this.minTimeInstance;
    const maxTime = this.maxTimeInstance;

    const date = Number(
      pickerDate.getFullYear() +
      toDouble(pickerDate.getMonth()) +
      toDouble(pickerDate.getDate()) +
      toDouble(hours));

    const lessIsMore = minTime.hours > maxTime.hours;

    const isLessThanMinDate = minDate ? date >= Number(
      minDate.getFullYear() +
      toDouble(minDate.getMonth()) +
      toDouble(minDate.getDate()) +
      toDouble(minDate.getHours())
    ) : true;

    const isLessThanMinTime = lessIsMore ?
      (hours >= minTime.hours && hours <= 24) :
      hours >= minTime.hours;

    const isMoreThanMaxDate = maxDate ? date <= Number(
      maxDate.getFullYear() +
      toDouble(maxDate.getMonth()) +
      toDouble(maxDate.getDate()) +
      toDouble(maxDate.getHours())) : true;

    const isMoreThanMaxTime = lessIsMore ?
      (hours <= maxTime.hours && hours >= 0) :
      hours <= maxTime.hours;

    return isLessThanMinDate && isLessThanMinTime && isMoreThanMaxDate && isMoreThanMaxTime;
  }

  private canSelectDay(day: Date): boolean {
    const date = Number(day.getFullYear() + toDouble(day.getMonth()) + toDouble(day.getDate()));
    const minDate = this.minDateInstance;
    const maxDate = this.maxDateInstance;
    const a = minDate ?
      date >= Number(
      minDate.getFullYear() +
      toDouble(minDate.getMonth()) +
      toDouble(minDate.getDate())
      ) :
      true;
    const b = maxDate ?
      date <= Number(
      maxDate.getFullYear() +
      toDouble(maxDate.getMonth()) +
      toDouble(maxDate.getDate())
      ) :
      true;

    return a && b;
  }

  private canSelectMonth(month: number): boolean {
    const date = Number(this.pickerDate.getFullYear() + toDouble(month));

    const a = this.minDateInstance ?
      date >= Number(this.minDateInstance.getFullYear() + toDouble(this.minDateInstance.getMonth())) :
      true;
    const b = this.maxDateInstance ?
      date <= Number(this.maxDateInstance.getFullYear() + toDouble(this.maxDateInstance.getMonth())) :
      true;

    return a && b;
  }

  private canSelectYear(year: number): boolean {
    const a = this.minDateInstance ? year >= this.minDateInstance.getFullYear() : true;
    const b = this.maxDateInstance ? year <= this.maxDateInstance.getFullYear() : true;
    return a && b;
  }

  private getNewDateByTime(oldDate: Date, timeInstance: Time, isLess: boolean): Date {
    if (!(oldDate instanceof Date)) {
      return oldDate;
    }
    const time = Number(timeInstance.hours + toDouble(timeInstance.minutes) + toDouble(timeInstance.seconds));
    const newDate = new Date();
    newDate.setTime(oldDate.getTime());
    const dateTime = Number(newDate.getHours() + toDouble(newDate.getMinutes()) + toDouble(newDate.getSeconds()));
    if (isLess ? time > dateTime : time < dateTime) {
      newDate.setHours(timeInstance.hours, timeInstance.minutes, timeInstance.seconds);
    }
    return newDate;
  }

  private insurePickerDateBetweenMinAndMax() {
    const minDate = this.minDateInstance;
    const maxDate = this.maxDateInstance;

    if (minDate && maxDate && minDate.getTime() > maxDate.getTime()) {
      throw new Error('No optional date or time!');
    }

    const pickerDate = this.pickerDate;

    if (minDate && pickerDate.getTime() < minDate.getTime()) {
      pickerDate.setTime(minDate.getTime());
    } else if (maxDate && pickerDate.getTime() > maxDate.getTime()) {
      pickerDate.setTime(maxDate.getTime());
    }

    const minTime = this.minTimeInstance;
    const maxTime = this.maxTimeInstance;

    const min = Number(minTime.hours + toDouble(minTime.minutes) + toDouble(minTime.seconds));
    const max = Number(maxTime.hours + toDouble(maxTime.minutes) + toDouble(maxTime.seconds));
    const pickerTime = Number(pickerDate.getHours() +
      toDouble(pickerDate.getMinutes()) +
      toDouble(pickerDate.getSeconds()));

    if (pickerTime < min) {
      pickerDate.setHours(minTime.hours, minTime.minutes, minTime.seconds);
    } else if (pickerTime > max) {
      pickerDate.setHours(maxTime.hours, maxTime.minutes, maxTime.seconds);
    }
  }
}
