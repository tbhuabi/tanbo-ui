import { Component, Input, OnInit, HostBinding, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'ui-checkbox',
    templateUrl: './checkbox.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: CheckboxComponent,
        multi: true
    }]
})
export class CheckboxComponent implements ControlValueAccessor, OnInit {
    @Input()
    checkedIcon: string = 'icon icon-checkbox-checked';
    @Input()
    uncheckedICon: string = 'icon icon-checkbox-unchecked';
    @Input()
    disabled: boolean = false;
    @Input()
    @HostBinding('class.checked')
    checked: boolean = false;

    private registerOnChangeFn: (_: any) => any;
    private registerOnTouchedFn: (_: any) => any;

    @HostListener('click') click() {
        let isDisabled = (this as any).hasOwnProperty('disabled');
        isDisabled = isDisabled && this.disabled !== false;
        if (isDisabled) {
            return;
        }
        this.checked = !this.checked;
        if (this.registerOnChangeFn) {
            this.registerOnChangeFn(this.checked);
        }
        if (this.registerOnTouchedFn) {
            this.registerOnTouchedFn(this.checked);
        }
    }

    ngOnInit() {
        let isChecked = (this as any).hasOwnProperty('checked');
        this.checked = isChecked && this.checked !== false;
    }

    writeValue(value: any) {
        this.checked = !!value;
    }

    registerOnChange(fn: any) {
        this.registerOnChangeFn = fn;
    }

    registerOnTouched(fn: any) {
        this.registerOnTouchedFn = fn;
    }

    setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled;
    }
}