export function attrToBoolean(value: any) {
  return value === '' || !!value;
}

export interface AttrBoolean {

}

export interface AttrBooleanDecorator {
  (bindingPropertyName?: string): any;
  new (bindingPropertyName?: string): any;
}

export const AttrBoolean: AttrBooleanDecorator = makePropDecorator<any, boolean>(attrToBoolean);

export function makePropDecorator<T, J>(fallback: (v: T) => J): AttrBooleanDecorator {
  function propDecoratorFactory(): any {
    function propDecorator(target: any, propertyKey: string | symbol) {
      let rawValue: T;
      Reflect.defineProperty(target, propertyKey, {
        get(): J {
          return fallback(rawValue);
        },
        set(v: T) {
          rawValue = v;
        }
      });
    }
    return propDecorator;
  }
  return propDecoratorFactory;
}
