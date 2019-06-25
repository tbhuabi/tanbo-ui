export function timeStringToDate(date: string | number | Date): Date | null {
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
  let times: Array<number> = date.match(/\d+/g).map(item => {
    return +item;
  });
  if (times.length === 3) {
    times = times.concat([0, 0, 0]);
  }
  if (times.length !== 6) {
    return null;
  }
  times[1] = times[1] - 1;
  return Date.apply(new Date(), ...times);
}

export function toDouble(n: number | string): string {
  if (n === undefined || n === '') {
    return '';
  }
  return n > 9 ? n + '' : '0' + n;
}

export function dateStringFormat(formatString: string, selectedDate: Date): string {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const day = selectedDate.getDate();
  const hours = selectedDate.getHours();
  const minutes = selectedDate.getMonth();
  const seconds = selectedDate.getSeconds();
  return formatString.replace(/[yMdhms]+/g, (str: string): string => {
    switch (str) {
      case 'yy':
        return year ? toDouble(year % 100) : '';
      case 'yyyy':
        return year + '';
      case 'M':
        return (month ? month + 1 : '') + '';
      case 'MM':
        return toDouble(month !== undefined ? month + 1 : '');
      case 'd':
        return day + '';
      case 'dd':
        return toDouble(day);
      case 'h':
        return (hours || '0') + '';
      case 'hh':
        return toDouble(hours) || '00';
      case 'm':
        return (minutes || '0') + '';
      case 'mm':
        return toDouble(minutes) || '00';
      case 's':
        return (seconds || '0') + '';
      case 'ss':
        return toDouble(seconds) || '00';
      default:
        return str;
    }
  });
}
