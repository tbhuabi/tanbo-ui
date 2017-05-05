import { Directive, Input, HostListener } from '@angular/core';
import { NgModel, FormControl } from '@angular/forms';
@Directive({
    selector: '[uiValidateModel]'
})
export class ModelValidatorDirective {
    @Input()
    doValidate: NgModel;

    @HostListener('click') click() {
        if (this.doValidate) {
            if (!this.doValidate.valid) {
                let control: FormControl = this.doValidate.formDirective.controls[this.doValidate.name];
                control.markAsDirty();
                control.markAsTouched();
            }
        }
    }
}