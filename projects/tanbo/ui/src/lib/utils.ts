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

export function AttrBoolean(): PropertyDecorator {
  function propDecorator(target: any, propertyKey: string | symbol) {
    let rawValue: any;
    Reflect.defineProperty(target, propertyKey, {
      get(): boolean {
        return attrToBoolean(rawValue);
      },
      set(v: any) {
        rawValue = v;
      }
    });
  }

  return propDecorator;
}

export function AttrNumber(defaultValue?: number): PropertyDecorator {
  function propDecorator(target: any, propertyKey: string | symbol) {
    let rawValue: any;
    Reflect.defineProperty(target, propertyKey, {
      get(): number {
        return attrToNumber(rawValue, defaultValue);
      },
      set(v: any) {
        rawValue = v;
      }
    });
  }

  return propDecorator;
}
