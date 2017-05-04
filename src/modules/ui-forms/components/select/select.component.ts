import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { isEmptyInputValue } from '../../../../utils/is-empty-input-value';

@Component({
    selector: 'ui-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: SelectComponent,
        multi: true
    }]
})
export class SelectComponent implements ControlValueAccessor {
    @HostBinding('class.focus')
    focus: boolean = false;
    @Input()
    disabled: boolean = false;
    @Input()
    readonly: boolean;
    @Input()
    name: string = '';
    @Output()
    change = new EventEmitter<string>();

    @Input()
    set value(value: any) {
        this.open = false;
        this.focus = false;
        if (value === this._value) {
            return;
        }
        if (isEmptyInputValue(value)) {
            value = '';
        }
        this._value = value + '';
        if (this.registerOnChangeFn) {
            this.registerOnChangeFn(this._value);
        }
        if (this.registerOnTouchedFn) {
            this.registerOnTouchedFn(this._value);
        }
        this.change.emit(this._value);
    };

    get value() {
        return this._value;
    };

    open: boolean = false;
    text: string = '';

    private _value = '';
    private registerOnChangeFn: (_: any) => {};
    private registerOnTouchedFn: (_: any) => {};

    writeValue(value: any) {
        this.value = value;
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

    trigger() {
        let isReadonly = (this as any).hasOwnProperty('readonly');
        isReadonly = isReadonly && this.readonly !== false;

        if (!this.disabled && !isReadonly) {
            this.open = !this.open;
            this.focus = true;
        }
    }

    escape() {
        this.open = false;
        this.focus = false;
    }
}