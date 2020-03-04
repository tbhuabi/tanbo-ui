import { attrToBoolean, attrToNumber } from '../utils';

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
