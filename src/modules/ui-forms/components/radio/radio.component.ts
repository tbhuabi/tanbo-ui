import { Component, Input, OnInit, OnDestroy, HostBinding, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { InputType } from '../../utils/input-type';

@Component({
    selector: 'ui-radio',
    templateUrl: './radio.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: RadioComponent,
        multi: true
    }]
})
export class RadioComponent implements ControlValueAccessor, InputType, OnInit, OnDestroy {
    @Input()
    disabled: boolean = false;
    @Input()
    readonly: boolean = false;
    @Input()
    type: string = '';
    @Input()
    @HostBinding('class.checked')
    checked: boolean = false;
    @Input()
    name: string = '';
    @Input()
    value: string = '';
    @Input()
    forId: string = '';
    @Input()
    checkedIcon: string = 'icon icon-radio-checked';
    @Input()
    uncheckedIcon: string = 'icon icon-radio-unchecked';

    labelElement: any;
    labelEventCallback: any;
    private registerOnChangeFn: (_: any) => any;
    private registerOnTouchedFn: (_: any) => any;

    @HostListener('click') click() {
        let isDisabled = (this as any).hasOwnProperty('disabled');
        isDisabled = isDisabled && this.disabled !== false;
        if (isDisabled) {
            return;
        }
        this.checked = true;
        if (this.registerOnChangeFn) {
            this.registerOnChangeFn(this.value);
        }
        if (this.registerOnTouchedFn) {
            this.registerOnTouchedFn(this.value);
        }
    }

    ngOnInit() {
        let isChecked = (this as any).hasOwnProperty('checked');
        this.checked = isChecked && this.checked !== false;
        let self = this;
        this.labelEventCallback = function () {
            self.click();
        };
        if (typeof this.forId === 'string' && this.forId !== '') {
            // TODO 这里对document有依赖，后续要处理掉
            this.labelElement = document.querySelector(`label[for=${this.forId}]`);
            this.labelElement.addEventListener('click', this.labelEventCallback);
        }
    }

    ngOnDestroy() {
        if (this.labelElement) {
            this.labelElement.removeEventListener('click', this.labelEventCallback);
        }
    }

    writeValue(value: any) {
        this.checked = this.value === value;
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