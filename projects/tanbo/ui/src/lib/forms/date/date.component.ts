import { Component, Input, EventEmitter, OnInit, Output, Inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { UI_SELECT_ARROW_CLASSNAME } from '../help';
import { timeStringToDate, dateStringFormat } from './date-utils';

import { attrToBoolean } from '../../utils';

export interface Year {
  year: number;
  disable: boolean;
}

export interface Month {
  month: number;
  disable: boolean;
}

export interface Day {
  date: Date;
  day: number;
  disable: boolean;
}

@Component({
  selector: 'ui-input[type=date]',
  templateUrl: './date.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: DateComponent,
    multi: true
  }]
})
export class DateComponent implements ControlValueAccessor, OnInit {
  @Output() uiChange = new EventEmitter<string | number>();
  @Input() position = 'bottomLeft';
  @Input() size = '';
  @Input() placeholder = '';
  @Input() forId: string;
  @Input() name: string;
  @Input() displayFormat: string;
  @Input() arrowIconClassName = '';
  @Input() format = 'yyyy-MM-dd';

  @Input()
  set value(value: string | number | Date) {
    this._value = value;
    this.selectedDate = timeStringToDate(value);
    this.currentDate = timeStringToDate(value);
    this.setupPicker();
  }

  get value() {
    return this._value;
  }

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

  @Input()
  set maxDate(value: string | number | Date) {
    this._maxDate = value;
    this.maxDateInstance = timeStringToDate(this._maxDate);
    this.setupPicker();
  }

  get maxDate() {
    return this._maxDate;
  }

  @Input()
  set minDate(value: string | number | Date) {
    this._minDate = value;
    this.minDateInstance = timeStringToDate(this._minDate);
    this.setupPicker();
  }

  get minDate() {
    return this._minDate;
  }

  get showHMS(): boolean {
    return /[hms]/.test(this.format);
  }

  focus = false;
  open = true;

  dayList: Array<Array<Day>> = [];
  minDateInstance: Date;
  maxDateInstance: Date;
  systemDate: Date;
  currentDate: Date;
  selectedDate = new Date();
  startYearIndex: number;
  years: Array<Year> = [];
  months: Array<Month> = [];

  showType = '';
  displayValue = '';

  canToPreviousYears = true;
  canToNextYears = true;
  canToPreviousYear = true;
  canToNextYear = true;

  private _disabled = false;
  private _readonly = false;
  private _maxDate: string | number | Date = '';
  private _minDate: string | number | Date = '';
  private _value: any = '';
  private onChange: (_: any) => any;
  private onTouched: () => any;
  private days: Array<Day> = [];

  constructor(@Inject(UI_SELECT_ARROW_CLASSNAME) arrowIcon: string) {
    this.arrowIconClassName = arrowIcon;
  }

  ngOnInit() {
    // 初始化日历组件，并缓存当前的年月日
    this.setupPicker();
  }

  setupPicker() {
    this.systemDate = new Date();
    if (!this.currentDate) {
      // 如果没有传入 value，则默认高亮当前时间
      this.currentDate = new Date();
    }
    if (this.minDate && this.systemDate.getUTCMilliseconds() < this.minDateInstance.getUTCMilliseconds()) {
      this.currentDate.setUTCMilliseconds(this.minDateInstance.getUTCMilliseconds());
    } else if (this.maxDate && this.systemDate.getUTCMilliseconds() > this.maxDateInstance.getUTCMilliseconds()) {
      this.currentDate.setUTCMilliseconds(this.maxDateInstance.getUTCMilliseconds());
    }
    this.startYearIndex = this.currentDate.getFullYear() - this.currentDate.getFullYear() % 32;
    this.update();
  }

  reset() {
    this.value = '';
    this.displayValue = '';
    this.selectedDate = null;
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

  updateYears(year: number) {
    this.startYearIndex = year;
    this.updateYearList();
  }

  updatePickerByYear(year: number) {
    this.currentDate.setFullYear(year);
    this.update();
  }

  toPreviousYear() {

  }

  toPrevMonth() {
    // this.updatePickerByMonth({
    //   this.currentDate.month - 1,
    // })
  }

  toNextMonth() {

  }

  updatePickerByMonth(month: number) {
    this.currentDate.setMonth(month);
    this.update();
  }

  selected(day: Day) {
    if (day.disable) {
      return;
    }
    const date = day.date;
    this.selectedDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    this.validateSelectedDate();
  }

  testValue(max: number, key: string, $event: any) {
    const selectedDate = this.selectedDate;
    if (selectedDate[key] > max) {
      const currentValue = (selectedDate[key] + '').replace(/\d$/, '');
      $event.target.value = currentValue;
      selectedDate[key] = +currentValue;
    }
    this.validateSelectedDate();
  }

  // 通过传入的format字符串，格式化选中后的日期数据
  getResult() {
    this.open = false;
    const selectedDate = this.selectedDate;
    let value: string;
    if (this.format) {
      value = dateStringFormat(this.format, selectedDate);
    } else {
      value = selectedDate.getTime().toString();
    }
    this.displayValue = dateStringFormat(this.displayFormat || this.format, selectedDate);
    this._value = value;
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

  private validateSelectedDate() {
    const selectedDate = this.selectedDate;
    if (this.minDateInstance) {
      if (selectedDate.getUTCMilliseconds() < this.minDateInstance.getUTCMilliseconds()) {
        this.selectedDate.setUTCMilliseconds(this.minDateInstance.getUTCMilliseconds());
      } else if (this.maxDateInstance.getUTCMilliseconds() &&
        selectedDate.getUTCMilliseconds() > this.maxDateInstance.getUTCMilliseconds()) {
        this.selectedDate.setUTCMilliseconds(this.maxDateInstance.getUTCMilliseconds());
      }
    } else if (this.maxDateInstance && selectedDate.getUTCMilliseconds() > this.maxDateInstance.getUTCMilliseconds()) {
      this.selectedDate.setUTCMilliseconds(this.maxDateInstance.getUTCMilliseconds());
    }
  }

  private update() {
    this.updateYearList();
    this.updateMonthList();
    this.updateDayList();
  }

  private updateDayList() {
    this.setDays();
    this.dayList = [];
    let child: Array<Day> = [];
    const dayMaxMillisecond = 24 * 60 * 60 * 1000;
    let timeRemainder;
    let startDayTimestamp;
    if (this.minDateInstance) {
      timeRemainder = this.minDateInstance.getUTCMilliseconds() % dayMaxMillisecond;
      startDayTimestamp = this.minDateInstance.getUTCMilliseconds() - timeRemainder;
    }
    for (let i = 0; i < this.days.length; i++) {
      const currentTimestamp = this.days[i].date.getUTCMilliseconds();
      if (this.minDateInstance) {
        if (currentTimestamp < startDayTimestamp) {
          this.days[i].disable = true;
        } else if (this.maxDateInstance && currentTimestamp > this.maxDateInstance.getUTCMilliseconds()) {
          this.days[i].disable = true;
        }
      } else if (this.maxDateInstance) {
        this.days[i].disable = currentTimestamp > this.maxDateInstance.getUTCMilliseconds();
      } else {
        this.days[i].disable = false;
      }

      if (i % 7 === 0) {
        child = [];
        this.dayList.push(child);
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
    this.canToPreviousYears = this.years[0].disable;
    this.canToNextYears = this.years[31].disable;
  }

  private canSelectMonth(month: number): boolean {
    const canSelectYear = this.canSelectYear(this.currentDate.getFullYear());
    if (!canSelectYear) {
      return false;
    }
    if (this.minDateInstance && this.currentDate.getFullYear() === this.minDateInstance.getFullYear()) {
      return month >= this.minDateInstance.getMonth();
    }
    if (this.maxDateInstance && this.currentDate.getFullYear() === this.maxDateInstance.getFullYear()) {
      return month <= this.maxDateInstance.getMonth();
    }
    return true;
  }

  private canSelectYear(year: number): boolean {
    return !((this.minDateInstance && year < this.minDateInstance.getFullYear()) ||
      (this.maxDateInstance && year > this.maxDateInstance.getFullYear()));
  }

  // 通过当前时间，计算上一月，当前月，及下一月的天数，并把所有天数添加到天数的集合，以更新显示在日历控件中的数据
  private setDays() {
    this.days = [];
    // 通过当前时间初始化date对象
    const dateInstance: Date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1, 0, 0, 0, 0);

    // 拿到当月第一天是星期几
    const currentMonthStartWeek = dateInstance.getDay();

    // 把当前时间设到上一月最后一天，并拿到最后一天的大小
    dateInstance.setDate(0);
    const prevMonthDayStartSize = dateInstance.getDate() - currentMonthStartWeek;

    // 获取上一月的年月
    let month = dateInstance.getMonth();
    let year = dateInstance.getFullYear();
    // 添加上一月的天数到days数据中
    for (let i = 0; i < currentMonthStartWeek; i++) {
      this.days.push({
        date: new Date(year, month, prevMonthDayStartSize + i + 1, 0, 0, 0, 0),
        disable: true,
        day: prevMonthDayStartSize + i + 1
      });
    }
    // 把当前时间设置到当月的最后一天，并获取年月，及更新相应数据
    dateInstance.setMonth(month + 2, 0);

    year = dateInstance.getFullYear();
    month = dateInstance.getMonth();
    const currentMonthLastDayNumber = dateInstance.getDate();
    // 添加当前月的天数到days数据中
    for (let i = 0; i < currentMonthLastDayNumber; i++) {
      this.days.push({
        date: new Date(year, month, i + 1, 0, 0, 0, 0),
        day: i + 1,
        disable: true
      });
    }
    // 把当前时间设置到下一月，并获取年月
    dateInstance.setMonth(month + 1, 1);
    year = dateInstance.getFullYear();
    month = dateInstance.getMonth();
    const nextMonthDaysSize = 42 - this.days.length;
    // 添加下一月的天数到days数据中
    for (let i = 0; i < nextMonthDaysSize; i++) {
      this.days.push({
        date: new Date(year, month, i + 1, 0, 0, 0, 0),
        day: i + 1,
        disable: true
      });
    }
  }

  private isSelectableYear(year: Date | number) {
    if (year instanceof Date) {
      year = year.getFullYear();
    }
    return year >= this.minDateInstance.getFullYear() || year <= this.maxDateInstance.getFullYear();
  }

  private isSelectableMonth(month: Date) {

  }
}
