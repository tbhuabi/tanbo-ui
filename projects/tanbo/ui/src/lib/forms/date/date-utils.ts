export function toDate(date: string | number | Date, toMax: boolean): Date | null {
  if (!date) {
    return null;
  }
  if (date instanceof Date) {
    return date;
  }
  if (typeof date === 'number') {
    const newDate = new Date();
    newDate.setTime(date);
    return newDate;
  }
  if (typeof date !== 'string') {
    return null;
  }
  let times: Array<number> = (date.match(/\d+/g) || []).map(item => {
    return +item;
  });
  if (times.length === 3) {
    times = times.concat(toMax ? [23, 59, 59] : [0, 0, 0]);
  }
  if (times.length !== 6) {
    return null;
  }
  times[1] = times[1] - 1;
  return new Date(times[0], times[1], times[2], times[3], times[4], times[5], 0);
}

export function toDouble(n: number | string): string {
  if (n === undefined || n === '') {
    return '';
  }
  return n > 9 ? n + '' : '0' + n;
}

export function dateFormat<T>(date: T, formatString: string): string | T {
  function format(d: Date): string {
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();
    return formatString.replace(/[yMdhms]+/g, (str: string): string => {
      switch (str) {
        case 'yyyy':
          return year + '';
        case 'M':
          return month + '';
        case 'MM':
          return toDouble(month);
        case 'd':
          return day + '';
        case 'dd':
          return toDouble(day);
        case 'h':
          return hours + '';
        case 'hh':
          return toDouble(hours);
        case 'm':
          return minutes + '';
        case 'mm':
          return toDouble(minutes);
        case 's':
          return seconds + '';
        case 'ss':
          return toDouble(seconds);
        default:
          return str;
      }
    });
  }

  if (typeof date === 'string') {
    return date;
  }
  if (typeof date === 'number') {
    const newDate = new Date();
    newDate.setTime(date);
    return format(newDate);
  } else if (date instanceof Date) {
    return format(date);
  }
  return date;
}

export class Time {
  set timeString(v: string) {
    if (typeof v === 'string') {
      const time = v.match(/\d{1,2}/g) || [];
      this._hours = this.insure(+time[0] || 0, 0, 24);
      this._minutes = this._hours === 24 ? 0 : this.insure(+time[1] || 0, 0, 59);
      this._seconds = this._hours === 24 ? 0 : this.insure(+time[2] || 0, 0, 59);
    }
  }

  get hours() {
    return this._hours;
  }

  get minutes() {
    return this._minutes;
  }

  get seconds() {
    return this._seconds;
  }

  private _hours: number;
  private _minutes: number;
  private _seconds: number;

  constructor(time: string) {
    this.timeString = time;
  }

  private insure(value: number, min: number, max: number): number {
    if (value < min) {
      return min;
    }
    if (value > max) {
      return max;
    }
    return value;
  }
}

export class DateConfig {
  formatString = '';

  get year() {
    return /yy|yyyy/.test(this.formatString);
  }

  get month() {
    return /M|MM/.test(this.formatString);
  }

  get day() {
    return /d|dd/.test(this.formatString);
  }

  get hours() {
    return /h|hh/.test(this.formatString);
  }

  get minutes() {
    return /m|mm/.test(this.formatString);
  }

  get seconds() {
    return /s|ss/.test(this.formatString);
  }

  get dateModel() {
    return this.year || this.month || this.day;
  }

  get timeModel() {
    return this.hours || this.minutes || this.seconds;
  }
}

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

export interface Hours {
  hours: number;
  disable: boolean;
}

export interface Minutes {
  minutes: number;
  disable: boolean;
}

export interface Seconds {
  seconds: number;
  disable: boolean;
}

export type DatePickerModel = 'time' | 'day' | 'month' | 'year';
