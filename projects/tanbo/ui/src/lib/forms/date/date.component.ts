import {
  Component,
  Input,
  EventEmitter,
  OnInit,
  Output,
  Inject,
  OnChanges,
  SimpleChanges,
  ViewChild, ElementRef, AfterViewChecked
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { UI_SELECT_ARROW_CLASSNAME } from '../help';
import {
  stringToDate,
  dateFormat,
  toDouble,
  Hours,
  Seconds,
  Minutes,
  Day,
  Month,
  Year,
  DateConfig, Time
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
export class DateComponent implements ControlValueAccessor, OnInit, OnChanges, AfterViewChecked {
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

  config = new DateConfig();

  focus = false;
  open = true;

  minDateInstance: Date;
  maxDateInstance: Date;
  minTimeInstance = new Time('00:00:00');
  maxTimeInstance = new Time('24:00:00');
  systemDate: Date;
  pickerDate: Date;
  startYearIndex: number;

  years: Year[] = [];
  months: Month[] = [];
  dayGroups: Day[][] = [];
  hours: Hours[] = [];
  minutes: Minutes[] = [];
  seconds: Seconds[] = [];

  showType = '';
  displayValue: any = '';

  model: 'date' | 'time' = null;

  private _disabled = false;
  private _readonly = false;
  private onChange: (_: any) => any;
  private onTouched: () => any;
  private days: Array<Day> = [];
  private viewEffects: boolean = false;

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
          this.displayValue = dateFormat(this.value, this.displayFormat || value);
          this.pickerDate = stringToDate(value);
          this.setupPicker();
          break;
        case 'maxDate':
          this.maxDateInstance = stringToDate(value);
          this.setupPicker();
          break;
        case 'minDate':
          this.minDateInstance = stringToDate(value);
          this.setupPicker();
          break;
        case 'minTime':
          this.minTimeInstance.timeString = value;
          break;
        case 'maxTime':
          this.maxTimeInstance.timeString = value;
          break;
        case 'displayFormat':
          this.displayValue = dateFormat(this.value, value || this.format);
          this.config.formatString = this.displayFormat || this.format;
          if (this.config.dateModel) {
            this.model = 'date';
          } else if (this.config.timeModel) {
            this.model = 'time';
          }
          break;
        case 'format':
          this.config.formatString = this.displayFormat || this.format;
          if (this.config.dateModel) {
            this.model = 'date';
          } else if (this.config.timeModel) {
            this.model = 'time';
            this.viewEffects = true;
          }
          break;
      }
    });
  }

  ngAfterViewChecked(): void {
    if (this.viewEffects) {
      this.timePickerScrollToCenter();
    }
  }

  setupPicker() {
    this.systemDate = new Date();
    if (!this.pickerDate) {
      // 如果没有传入 value，则默认高亮当前时间
      this.pickerDate = new Date();
    }
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

  changeShowType(type?: string) {
    this.showType = this.showType === type ? '' : type;
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

  switchModel() {
    this.model = this.model === 'date' ? 'time' : 'date';
    if (this.model === 'time') {
      this.viewEffects = true;
    }
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
    this.startYearIndex = year;
    this.updateYearList();
  }

  updatePickerByYear(year: number) {
    const month = this.pickerDate.getMonth();
    this.pickerDate.setFullYear(year);

    const newMonth = this.pickerDate.getMonth();
    if (newMonth > month) {
      this.pickerDate.setMonth(newMonth, 0);
    }
    this.insurePickerDateBetweenMinAndMax();
    this.setupPicker();
    this.showType = '';
  }

  updatePickerByMonth(month: number) {
    const day = this.pickerDate.getDate();

    this.pickerDate.setMonth(month + 1, 0);

    if (day < this.pickerDate.getDate()) {
      this.pickerDate.setDate(day);
    }
    this.insurePickerDateBetweenMinAndMax();
    this.update();
    this.showType = '';
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
    this.viewEffects = true;
    this.update();
  }

  updatePickerByMinutes(minutes: number) {
    this.pickerDate.setMinutes(minutes);
    this.insurePickerDateBetweenMinAndMax();
    this.viewEffects = true;
    this.update();
  }

  updatePickerBySeconds(seconds: number) {
    this.pickerDate.setSeconds(seconds);
    this.insurePickerDateBetweenMinAndMax();
    this.viewEffects = true;
    this.update();
  }

  getResult() {
    this.open = false;
    const pickerDate = this.pickerDate;
    let value: any;
    if (this.format) {
      value = dateFormat(pickerDate, this.format);
    } else {
      value = pickerDate.getTime().toString();
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

  private update() {
    this.updateYearList();
    this.updateMonthList();
    this.updateDayList();
    this.updateHoursList();
    this.updateMinutesList();
    this.updateSecondsList();
  }

  private timePickerScrollToCenter() {
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

    const date = Number(
      pickerDate.getFullYear() +
      toDouble(pickerDate.getMonth()) +
      toDouble(pickerDate.getDate()) +
      toDouble(pickerDate.getHours()) +
      toDouble(pickerDate.getMinutes()) +
      toDouble(seconds));

    const a = minDate ?
      date >= Number(
      minDate.getFullYear() +
      toDouble(minDate.getMonth()) +
      toDouble(minDate.getDate()) +
      toDouble(minDate.getHours()) +
      toDouble(minDate.getMinutes()) +
      toDouble(Math.max(this.minTimeInstance.seconds, minDate.getSeconds()))
      ) :
      true;
    const b = maxDate ?
      date <= Number(
      maxDate.getFullYear() +
      toDouble(maxDate.getMonth()) +
      toDouble(maxDate.getDate()) +
      toDouble(maxDate.getHours()) +
      toDouble(maxDate.getMinutes()) +
      toDouble(Math.min(this.maxTimeInstance.seconds, maxDate.getSeconds()))
      ) :
      true;

    return a && b;
  }

  private canSelectMinutes(minutes: number) {
    const pickerDate = this.pickerDate;
    const minDate = this.minDateInstance;
    const maxDate = this.maxDateInstance;

    const date = Number(
      pickerDate.getFullYear() +
      toDouble(pickerDate.getMonth()) +
      toDouble(pickerDate.getDate()) +
      toDouble(pickerDate.getHours()) +
      toDouble(minutes));

    const a = minDate ?
      date >= Number(
      minDate.getFullYear() +
      toDouble(minDate.getMonth()) +
      toDouble(minDate.getDate()) +
      toDouble(minDate.getHours()) +
      toDouble(Math.max(this.minTimeInstance.minutes, minDate.getMinutes()))
      ) :
      true;
    const b = maxDate ?
      date <= Number(
      maxDate.getFullYear() +
      toDouble(maxDate.getMonth()) +
      toDouble(maxDate.getDate()) +
      toDouble(maxDate.getHours()) +
      toDouble(Math.min(this.maxTimeInstance.minutes, maxDate.getMinutes()))
      ) :
      true;

    return a && b;
  }

  private canSelectHours(hours: number) {
    const pickerDate = this.pickerDate;
    const minDate = this.minDateInstance;
    const maxDate = this.maxDateInstance;

    const date = Number(
      pickerDate.getFullYear() +
      toDouble(pickerDate.getMonth()) +
      toDouble(pickerDate.getDate()) +
      toDouble(hours));

    const a = minDate ?
      date >= Number(
      minDate.getFullYear() +
      toDouble(minDate.getMonth()) +
      toDouble(minDate.getDate()) +
      toDouble(Math.max(this.minTimeInstance.hours, minDate.getHours()))
      ) :
      true;
    const b = maxDate ?
      date <= Number(
      maxDate.getFullYear() +
      toDouble(maxDate.getMonth()) +
      toDouble(maxDate.getDate()) +
      toDouble(Math.min(this.maxTimeInstance.hours, maxDate.getHours()))
      ) :
      true;

    return a && b;
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

  private insurePickerDateBetweenMinAndMax() {
    if (this.minDateInstance &&
      this.pickerDate.getTime() < this.minDateInstance.getTime()) {
      this.pickerDate.setTime(this.minDateInstance.getTime());
    } else if (this.maxDateInstance &&
      this.pickerDate.getTime() > this.maxDateInstance.getTime()) {
      this.pickerDate.setTime(this.maxDateInstance.getTime());
    }
  }
}
