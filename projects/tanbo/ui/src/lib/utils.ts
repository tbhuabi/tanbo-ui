export function attrToBoolean(value: any) {
  return value === '' || !!value;
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
