import { Component, Input, OnInit, OnDestroy, HostBinding, HostListener } from '@angular/core';
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
export class CheckboxComponent implements ControlValueAccessor, OnInit, OnDestroy {
    @Input()
    disabled: boolean = false;
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
    checkedIcon: string = 'icon icon-checkbox-checked';
    @Input()
    uncheckedIcon: string = 'icon icon-checkbox-unchecked';

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