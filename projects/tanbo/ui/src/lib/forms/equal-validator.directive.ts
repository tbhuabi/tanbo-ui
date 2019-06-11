import { Directive, Input, Optional, OnDestroy } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidationErrors, Validator, NgModel, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { UIValidators } from './validators';

@Directive({
  /* tslint:disable */
  selector: '[equal]',
  /* tslint:enable */
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: EqualValidator,
    multi: true
  }]
})
export class EqualValidator implements Validator, OnDestroy {
  @Input()
  get equal(): NgModel | string {
    return this._equal;
  }

  set equal(value: NgModel | string) {
    this._equal = value;
    if (this._onChange) {
      this._onChange();
    }
    if (this.controller) {
      this.subscribe();
    }
  }

  private referenceController: AbstractControl;
  private controller: AbstractControl;
  private sub: Subscription;
  private isFirst = true;

  private _equal: NgModel | string;
  private _onChange: () => void;

  constructor(@Optional() private ngForm: NgForm) {
  }

  ngOnDestroy() {
    this.unSub();
  }

  subscribe() {
    this.unSub();
    let right: AbstractControl;
    if (this.equal instanceof NgModel) {
      right = this.equal.control;
    } else if (typeof this.equal === 'string' && this.ngForm) {
      right = this.ngForm.controls[this.equal];
    }
    if (right instanceof AbstractControl) {
      this.referenceController = right;
      this.sub = right.valueChanges.subscribe(() => {
        this.controller.updateValueAndValidity({
          onlySelf: true
        });
      });
    } else {
      this.referenceController = null;
    }
  }

  unSub() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  validate(c: AbstractControl): ValidationErrors | null {
    this.controller = c;
    if (this.isFirst) {
      this.subscribe();
      this.isFirst = false;
    }
    const value = c.value;
    if (value === '' || value === undefined || value === null || !this.referenceController) {
      return null;
    }
    return UIValidators.equal(c, this.referenceController);
  }

  registerOnValidatorChange(fn: () => void): void {
    this._onChange = fn;
  }
}