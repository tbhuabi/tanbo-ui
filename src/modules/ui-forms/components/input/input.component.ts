import { Component, Input, OnInit, HostBinding, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'ui-input',
    templateUrl: './input.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: InputComponent,
        multi: true
    }]
})
export class InputComponent implements ControlValueAccessor, OnInit {
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
    id: string = '';

    @Input()
    get checkedIcon() {
        if (this._checkedIcon) {
            return this._checkedIcon;
        }
        if (this.type === 'radio') {
            return this.radioIcons[0];
        }
        if (this.type === 'checkbox') {
            return this.checkboxIcons[0];
        }
    }

    set checkedIcon(iconName: string) {
        this._checkedIcon = iconName;
    }

    @Input()
    get uncheckedICon() {
        if (this._checkedIcon) {
            return this._checkedIcon;
        }
        if (this.type === 'radio') {
            return this.radioIcons[1];
        }
        if (this.type === 'checkbox') {
            return this.checkboxIcons[1];
        }
    }

    set uncheckedIcon(iconName: string) {
        this._uncheckedIcon = iconName;
    }

    private _checkedIcon: string = '';
    private _uncheckedIcon: string = '';
    private checkboxIcons: Array<string> = ['icon icon-checkbox-checked', 'icon icon-checkbox-unchecked'];
    private radioIcons: Array<string> = ['icon icon-radio-checked', 'icon icon-radio-unchecked'];
    private registerOnChangeFn: (_: any) => any;
    private registerOnTouchedFn: (_: any) => any;

    @HostListener('click') click() {
        let isDisabled = (this as any).hasOwnProperty('disabled');
        isDisabled = isDisabled && this.disabled !== false;
        if (isDisabled) {
            return;
        }
        let value: boolean | string;
        if (this.type === 'checkbox') {
            value = this.checked = !this.checked;
        } else if (this.type === 'radio') {
            value = this.value;
        }

        if (this.registerOnChangeFn) {
            this.registerOnChangeFn(value);
        }
        if (this.registerOnTouchedFn) {
            this.registerOnTouchedFn(value);
        }
    }

    ngOnInit() {
        let isChecked = (this as any).hasOwnProperty('checked');
        this.checked = isChecked && this.checked !== false;
    }

    writeValue(value: any) {
        if (this.type === 'checkbox') {
            this.checked = !!value;
        } else if (this.type === 'radio') {
            this.checked = this.value === value;
        }
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