import { Component, Input, EventEmitter, OnInit, Output, Inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { UI_SELECT_ARROW_CLASSNAME } from '../help';
import { TimeDetails, timeAnalysisByTimeString, dateStringFormat } from './date-utils';

import { inputAttrToBoolean } from '../help';

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
  @Input()
  set disabled(isDisabled: any) {
    this._disabled = inputAttrToBoolean(isDisabled);
  }

  get disabled() {
    return this._disabled;
  }

  @Input()
  set readonly(isReadonly: any) {
    this._readonly = inputAttrToBoolean(isReadonly);
  }

  get readonly() {
    return this._readonly;
  }

  @Input()
  size: string = '';
  @Input()
  placeholder: string = '';
  @Input()
  forId: string = '';
  @Input()
  value: string | number;
  @Input()
  name = '';
  @Input()
  displayFormat: string;
  @Input()
  arrowIconClassName: string = '';
  @Input()
  format: string = 'yyyy-MM-dd';
  @Output()
  uiChange = new EventEmitter<string | number>();
  focus: boolean = false;
  open: boolean = false;

  @Input()
  set maxDate(value) {
    this._maxDate = value || '';
    this.maxDateTimeDetails = timeAnalysisByTimeString(this._maxDate);
    this.update();
  }

  get maxDate() {
    return this._maxDate;
  }

  @Input()
  set minDate(value) {
    this._minDate = value || '';
    this.minDateTimeDetails = timeAnalysisByTimeString(this._minDate);
    this.update();
  }

  get minDate() {
    return this._minDate;
  }

  get showHMS(): boolean {
    return /[hms]/.test(this.format);
  }

  dayList: Array<Array<TimeDetails>> = [];
  minDateTimeDetails: TimeDetails = {};
  maxDateTimeDetails: TimeDetails = {};
  systemDateTimeDetails: TimeDetails = {};
  currentDateTimeDetails: TimeDetails = {};
  selectedDateTimeDetails: TimeDetails = {};
  startYearIndex: number;
  years: Array<any> = [];
  months: Array<any> = [];

  showType: string = '';
  displayValue = '';

  private _disabled: boolean;
  private _readonly: boolean;
  private _maxDate = '';
  private _minDate = '';
  private onChange: (_: any) => any;
  private onTouched: () => any;
  private days: Array<TimeDetails> = [];

  constructor(@Inject(UI_SELECT_ARROW_CLASSNAME) arrowIcon: string) {
    this.arrowIconClassName = arrowIcon;
  }

  ngOnInit() {
    // 初始化日历组件，并缓存当前的年月日
    let date: Date = new Date();

    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let timestamp = Date.UTC(year, month, day, hours, minutes, seconds, 0);

    this.systemDateTimeDetails = {
      year,
      month,
      day,
      hours,
      minutes,
      seconds,
      timestamp
    };
    if (this.minDate && timestamp < this.minDateTimeDetails.timestamp) {
      this.currentDateTimeDetails = JSON.parse(JSON.stringify(this.minDateTimeDetails));
    } else if (this.maxDate && timestamp > this.maxDateTimeDetails.timestamp) {
      this.currentDateTimeDetails = JSON.parse(JSON.stringify(this.maxDateTimeDetails));
    } else {
      this.currentDateTimeDetails = {
        year,
        month,
        day,
        hours,
        minutes,
        seconds,
        timestamp
      };
    }
    this.startYearIndex = this.currentDateTimeDetails.year - this.currentDateTimeDetails.year % 16;
    this.update();
  }

  reset() {
    this.value = '';
    this.displayValue = '';
    this.selectedDateTimeDetails = {};
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

  setYears(year: number) {
    this.startYearIndex = year;
    this.updateYearList();
  }

  checkYear(obj: any) {
    if (obj.disable) {
      return;
    }
    this.currentDateTimeDetails.year = obj.year;
    this.update();
  }

  setMonth(obj: any) {
    if (obj.isDisable) {
      return;
    }
    this.currentDateTimeDetails.month = obj.month;
    this.update();
  }

  selected(day: TimeDetails) {
    if (day.disabled) {
      return;
    }
    this.selectedDateTimeDetails.year = day.year;
    this.selectedDateTimeDetails.month = day.month;
    this.selectedDateTimeDetails.day = day.day;
    this.validateSelectedDate();
  }

  testValue(max: number, key: string, $event: any) {
    let selectedDate = this.selectedDateTimeDetails;
    if (selectedDate[key] > max) {
      let currentValue = (selectedDate[key] + '').replace(/\d$/, '');
      $event.target.value = currentValue;
      selectedDate[key] = +currentValue;
    }
    this.validateSelectedDate();
  }

  // 通过传入的format字符串，格式化选中后的日期数据
  getResult() {
    this.open = false;
    let selectedDate: TimeDetails = this.selectedDateTimeDetails;
    let value: string | number;
    if (this.format) {
      value = dateStringFormat(this.format, selectedDate);
    } else {
      const date = new Date();
      date.setFullYear(selectedDate.year);
      date.setMonth(selectedDate.month);
      date.setDate(selectedDate.day);
      date.setHours(selectedDate.hours);
      date.setMinutes(selectedDate.minutes);
      date.setSeconds(selectedDate.seconds);
      value = date.getTime();
    }
    this.displayValue = dateStringFormat(this.displayFormat || this.format, selectedDate);
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

  private validateSelectedDate() {
    let selectedDate = this.selectedDateTimeDetails;
    if (!selectedDate.year) {
      return;
    }
    let n = Date.UTC(selectedDate.year,
      selectedDate.month,
      selectedDate.day,
      selectedDate.hours || 0,
      selectedDate.minutes || 0,
      selectedDate.seconds || 0, 0);
    if (this.minDateTimeDetails) {
      if (n < this.minDateTimeDetails.timestamp) {
        this.selectedDateTimeDetails = JSON.parse(JSON.stringify(this.minDateTimeDetails));
      } else if (this.maxDateTimeDetails && n > this.maxDateTimeDetails.timestamp) {
        this.selectedDateTimeDetails = JSON.parse(JSON.stringify(this.maxDateTimeDetails));
      }
    } else if (this.maxDateTimeDetails && n > this.maxDateTimeDetails.timestamp) {
      this.selectedDateTimeDetails = JSON.parse(JSON.stringify(this.maxDateTimeDetails));
    }
  }

  private update() {
    // 通过当前的年月日，计算显示在日历控件中的年月日
    let currentDate = this.currentDateTimeDetails;
    if (!currentDate.year) {
      return;
    }
    let date = new Date();
    date.setFullYear(currentDate.year);
    date.setMonth(currentDate.month + 1, 0);
    let testDay = date.getDate();
    if (currentDate.day > testDay) {
      currentDate.day = testDay;
    }
    date.setDate(currentDate.day);
    date.setHours(currentDate.hours);
    date.setMinutes(currentDate.minutes);
    date.setSeconds(currentDate.seconds);
    date.setMilliseconds(currentDate.seconds);

    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    this.currentDateTimeDetails = {
      year,
      month,
      day,
      hours,
      minutes,
      seconds,
      timestamp: Date.UTC(year, month, day, hours, minutes, seconds, 0)
    };

    this.updateYearList();
    this.updateMonthList();
    this.updateDayList();
  }

  private updateDayList() {
    this.setDays();
    this.dayList = [];
    let child: Array<TimeDetails> = [];
    let dayMaxMillisecond = 24 * 60 * 60 * 1000;
    let timeRemainder;
    let startDayTimestamp;
    if (this.minDateTimeDetails) {
      timeRemainder = this.minDateTimeDetails.timestamp % dayMaxMillisecond;
      startDayTimestamp = this.minDateTimeDetails.timestamp - timeRemainder;
    }
    for (let i = 0; i < this.days.length; i++) {
      let currentTimestamp = this.days[i].timestamp;
      if (this.minDateTimeDetails) {
        if (currentTimestamp < startDayTimestamp) {
          this.days[i].disabled = true;
        } else if (this.maxDateTimeDetails && currentTimestamp > this.maxDateTimeDetails.timestamp) {
          this.days[i].disabled = true;
        }
      } else if (this.maxDateTimeDetails) {
        this.days[i].disabled = currentTimestamp > this.maxDateTimeDetails.timestamp;
      } else {
        this.days[i].disabled = false;
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
        isDisable: this.isDisableMonth(i)
      });
    }
  }

  private updateYearList() {
    let startIndex: number = this.startYearIndex;
    this.years = [];
    let endIndex = startIndex + 16;
    while (startIndex < endIndex) {
      this.years.push({
        year: startIndex,
        isDisable: this.isDisableYear(startIndex)
      });
      startIndex++;
    }
  }

  private isDisableMonth(month: number): boolean {
    let r = this.isDisableYear(this.currentDateTimeDetails.year);
    if (r) {
      return true;
    }
    if (this.minDateTimeDetails && this.currentDateTimeDetails.year === this.minDateTimeDetails.year) {
      return month < this.minDateTimeDetails.month;
    }
    if (this.maxDateTimeDetails && this.maxDateTimeDetails.year === this.maxDateTimeDetails.year) {
      return month > this.maxDateTimeDetails.month;
    }
    return false;
  }

  private isDisableYear(year: number): boolean {
    return (this.minDateTimeDetails && year < this.minDateTimeDetails.year ||
      this.maxDateTimeDetails && year > this.maxDateTimeDetails.year);
  }

  // 通过当前时间，计算上一月，当前月，及下一月的天数，并把所有天数添加到天数的集合，以更新显示在日历控件中的数据
  private setDays() {
    this.days = [];
    // 通过当前时间初始化date对象
    let dateInstance: Date = new Date();
    dateInstance.setFullYear(this.currentDateTimeDetails.year);
    dateInstance.setMonth(this.currentDateTimeDetails.month, 1);
    dateInstance.setHours(0);
    dateInstance.setMinutes(0);
    dateInstance.setSeconds(0);
    dateInstance.setMilliseconds(0);

    // 拿到当月第一天是星期几
    let currentMonthStartWeek = dateInstance.getDay();

    // 把当前时间设到上一月最后一天，并拿到最后一天的大小
    dateInstance.setDate(0);
    let prevMonthDayStartSize = dateInstance.getDate() - currentMonthStartWeek;

    // 获取上一月的年月
    let month = dateInstance.getMonth();
    let year = dateInstance.getFullYear();
    // 添加上一月的天数到days数据中
    for (let i = 0; i < currentMonthStartWeek; i++) {
      this.days.push({
        year,
        month,
        day: prevMonthDayStartSize + i + 1,
        hours: 0,
        minutes: 0,
        seconds: 0,
        timestamp: Date.UTC(year, month, prevMonthDayStartSize + i + 1, 0, 0, 0, 0),
      });
    }
    // 把上一月的时间设置为1日，防止溢出
    dateInstance.setDate(1);
    // 把当前时间设置到下一月
    dateInstance.setMonth(month + 2);
    // 把当前时间设置到当月的最后一天，并获取年月，及更新相应数据
    dateInstance.setDate(0);
    year = dateInstance.getFullYear();
    month = dateInstance.getMonth();
    this.currentDateTimeDetails.year = year;
    this.currentDateTimeDetails.month = month;
    let currentMonthLastDayNumber = dateInstance.getDate();
    // 添加当前月的天数到days数据中
    for (let i = 0; i < currentMonthLastDayNumber; i++) {
      this.days.push({
        year,
        month,
        day: i + 1,
        hours: 0,
        minutes: 0,
        seconds: 0,
        timestamp: Date.UTC(year, month, i + 1, 0, 0, 0, 0),
      });
    }
    // 把当月时间设置为1日，防止溢出
    dateInstance.setDate(1);
    // 把当前时间设置到下一月，并获取年月
    dateInstance.setMonth(month + 1);
    year = dateInstance.getFullYear();
    month = dateInstance.getMonth();
    let nextMonthDaysSize = 42 - this.days.length;
    // 添加下一月的天数到days数据中
    for (let i = 0; i < nextMonthDaysSize; i++) {
      this.days.push({
        year,
        month,
        day: i + 1,
        hours: 0,
        minutes: 0,
        seconds: 0,
        timestamp: Date.UTC(year, month, i + 1, 0, 0, 0, 0)
      });
    }
  }
}