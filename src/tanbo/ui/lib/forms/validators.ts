import { AbstractControl, ValidationErrors } from '@angular/forms';

function isEmptyInputValue(value: any): boolean {
  return value === '' || value === null || value === undefined;
}

export class UIValidators {
  static integer(c: AbstractControl): ValidationErrors | null {
    const value = c.value;
    const r = Number(value);
    if (isNaN(r)) {
      return {integer: value};
    }
    return r === r - (r % 1) ? null : {integer: value};
  }

  static pickerRequired(c: AbstractControl): ValidationErrors | null {
    return Array.isArray(c.value) && c.value.length > 0 ? null : {required: true};
  }

  static equal(left: AbstractControl, right: AbstractControl): ValidationErrors | null {
    if (isEmptyInputValue(left.value) && isEmptyInputValue(right.value)) {
      return null;
    }
    return left.value === right.value ? null : {equal: true};
  }
}