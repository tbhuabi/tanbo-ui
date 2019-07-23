import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, Validator } from '@angular/forms';

import { UIValidators } from './validators';

@Directive({
  /* tslint:disable */
  selector: '[integer]',
  /* tslint:enable */
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => IntegerValidator),
    multi: true
  }]
})
export class IntegerValidator implements Validator {

  validate(c: AbstractControl) {
    return c.value ? UIValidators.integer(c) : null;
  }
}
