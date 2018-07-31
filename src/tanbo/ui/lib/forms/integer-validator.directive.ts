import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  /* tslint:disable */
  selector: '[integer]',
  /* tslint:enable */
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: IntegerValidator,
    multi: true
  }]
})
export class IntegerValidator implements Validator {

  validate(c: AbstractControl): ValidationErrors | null {
    const value = c.value;
    if (value) {
      const r = Number(value);
      if (isNaN(r)) {
        return {'integer': value};
      }
      return r === r - (r % 1) ? null : {'integer': value};
    }
    return null;
  }
}