import { Component, Input, EventEmitter, OnInit, Output, Inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { UI_SELECT_ARROW_CLASSNAME } from '../help';
import { timeStringToDate, dateStringFormat, toDouble } from './date-utils';

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
    this.pickerDate = timeStringToDate(value);
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
  pickerDate: Date;
  startYearIndex: number;
  years: Array<Year> = [];
  months: Array<Month> = [];

  showType = '';
  displayValue = '';

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
    if (!this.pickerDate) {
      // 如果没有传入 value，则默认高亮当前时间
      this.pickerDate = new Date();
    }
    this.insurePickerDateBetweenMinAndMax();
    this.startYearIndex = this.pickerDate.getFullYear() - this.pickerDate.getFullYear() % 32;
    this.update();
  }

  reset() {
    this._value = '';
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

  updateYears(year: number) {
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

  selected(day: Day) {
    if (day.disable) {
      return;
    }
    const date = day.date;
    this.pickerDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    this.update();
  }

  getResult() {
    this.open = false;
    const pickerDate = this.pickerDate;
    let value: string;
    if (this.format) {
      value = dateStringFormat(this.format, pickerDate);
    } else {
      value = pickerDate.getTime().toString();
    }
    this.displayValue = dateStringFormat(this.displayFormat || this.format, pickerDate);
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

  private update() {
    this.updateYearList();
    this.updateMonthList();
    this.updateDayList();
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

    this.dayList = [];
    let child: Array<Day> = [];
    for (let i = 0; i < this.days.length; i++) {
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
  }

  private canSelectDay(day: Date) {
    const date = Number(day.getFullYear() + toDouble(day.getMonth()) + toDouble(day.getDate()));

    const a = this.minDateInstance ?
      date >= Number(
      this.minDateInstance.getFullYear() +
      toDouble(this.minDateInstance.getMonth()) +
      toDouble(this.minDateInstance.getDate())
      ) :
      true;
    const b = this.maxDateInstance ?
      date <= Number(
      this.maxDateInstance.getFullYear() +
      toDouble(this.maxDateInstance.getMonth()) +
      toDouble(this.maxDateInstance.getDate())
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
