import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
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
export class SelectComponent implements ControlValueAccessor, AfterViewInit {
    @Input()
    set value(value: any) {
        if (!this.isInit) {
            return;
        }
        this.open = false;
        if (value === this._value) {
            return;
        }
        if (isEmptyInputValue(value)) {
            value = '';
        }
        this._value = value + '';
        this.registerOnChangeFn(this._value);
        this.registerOnTouchedFn(this._value);
        this.change.emit(this._value);
    };

    get value() {
        return this._value;
    };

    @Input()
    disabled: boolean = false;
    @Output()
    change = new EventEmitter<string>();
    open: boolean = false;
    text: string = '';

    private _value = '';
    private registerOnChangeFn: (_: any) => {};
    private registerOnTouchedFn: (_: any) => {};
    private isInit: boolean = false;

    ngAfterViewInit() {
        this.isInit = true;
    }

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
        if (!this.disabled) {
            this.open = !this.open;
        }
    }
}