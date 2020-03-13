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

export function GourdBoolean(): PropertyDecorator {
  return function(target, propertyKey) {
    const key = Symbol();
    Reflect.defineProperty(target, propertyKey, {
      set(v: any) {
        this[key] = attrToBoolean(v);
      },
      get(): boolean {
        return this[key];
      }
    });
  };
}

export function GourdNumber(defaultValue: number): PropertyDecorator {
  return function(target, propertyKey) {
    const key = Symbol();
    Reflect.defineProperty(target, propertyKey, {
      set(v: any) {
        this[key] = attrToNumber(v, defaultValue);
      },
      get(): boolean {
        return this[key];
      }
    });
  }
}
