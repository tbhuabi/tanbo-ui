export function attrToBoolean(value: any) {
  return value === '' || !!value;
}

export interface AttrBoolean {

}

export interface AttrBooleanDecorator {
  (): any;
  new(): any;
}

export const AttrBoolean: AttrBooleanDecorator = makePropDecorator<any, boolean>(attrToBoolean);

function makePropDecorator<T, J>(fallback: (v: T) => J): any {
  return function(): any {
    return function(target: any, propertyKey: string | symbol) {
      let rawValue: T;
      Reflect.defineProperty(target, propertyKey, {
        get(): J {
          return fallback(rawValue);
        },
        set(v: T) {
          rawValue = v;
        }
      });
    };
  };
}
