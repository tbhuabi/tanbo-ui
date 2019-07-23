import { Directive, Input, forwardRef } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidationErrors, Validator, Validators } from '@angular/forms';

import { UIValidators } from './validators';

@Directive({
  /* tslint:disable */
  selector: 'ui-input[required][type=checkbox],ui-switch[required]',
  /* tslint:enable */
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => RequiredTrueValidator),
    multi: true
  }]
})
export class RequiredTrueValidator implements Validator {
  private _required: boolean;
  private _onChange: () => void;

  @Input()
  get required(): boolean | string {
    return this._required;
  }

  set required(value: boolean | string) {
    this._required = value !== false && value !== null;
    if (this._onChange) {
      this._onChange();
    }
  }

  validate(c: AbstractControl): ValidationErrors | null {
    return this.required ? Validators.requiredTrue(c) : null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this._onChange = fn;
  }
}

@Directive({
  /* tslint:disable */
  selector: 'ui-input[required][type=radio],ui-select[required],ui-input[type=date][required],ui-markdown-editor[required], ui-editor[required]',
  /* tslint:enable */
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: RequiredValidator,
    multi: true
  }]
})
export class RequiredValidator implements Validator {
  private _required: boolean;
  private _onChange: () => void;

  @Input()
  get required(): boolean | string {
    return this._required;
  }

  set required(value: boolean | string) {
    this._required = value !== false && value !== null;
    if (this._onChange) {
      this._onChange();
    }
  }

  validate(c: AbstractControl): ValidationErrors | null {
    return this.required ? Validators.required(c) : null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this._onChange = fn;
  }
}

@Directive({
  /* tslint:disable */
  selector: 'ui-picker[required]',
  /* tslint:enable */
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PickerRequiredValidator,
    multi: true
  }]
})
export class PickerRequiredValidator implements Validator {
  private _required: boolean;
  private _onChange: () => void;

  @Input()
  get required(): boolean | string {
    return this._required;
  }

  set required(value: boolean | string) {
    this._required = value !== false && value !== null;
    if (this._onChange) {
      this._onChange();
    }
  }

  validate(c: AbstractControl): ValidationErrors | null {
    return this.required ? UIValidators.pickerRequired(c) : null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this._onChange = fn;
  }
}
