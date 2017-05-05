import { Directive, Input, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
@Directive({
    selector: '[uiValidateForm]'
})
export class FormValidatorDirective {
    @Input()
    validate: NgForm;

    @HostListener('submit') submit() {
        if (this.validate && !this.validate.valid) {
            this.validate.ngSubmit.isStopped = true;
            let controls = this.validate.controls;
            for (let key in controls) {
                if (controls.hasOwnProperty(key)) {
                    let formControl = controls[key];
                    formControl.markAsDirty();
                    formControl.markAsTouched();
                }
            }
            return false;
        } else {
            this.validate.ngSubmit.isStopped = false;
        }
    }
}