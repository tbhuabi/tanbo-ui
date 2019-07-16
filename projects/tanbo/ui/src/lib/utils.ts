export function attrToBoolean(value: any) {
  return value === '' || !!value;
}

export function attrToNumber(value: any, defaultValue?: number): number {
  if (typeof value === 'number') {
    return value;
  }
  const newNumber = parseFloat(value);
  if (isNaN(newNumber)) {
    return defaultValue;
  } else {
    return newNumber;
  }
}
