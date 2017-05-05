import {
    Component,
    ContentChildren,
    QueryList,
    AfterContentInit,
    Input,
    Output,
    OnDestroy,
    EventEmitter,
    HostBinding
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';

import { OptionComponent } from '../option/option.component';

@Component({
    selector: 'ui-select',
    templateUrl: './select.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: SelectComponent,
        multi: true
    }]
})
export class SelectComponent implements ControlValueAccessor, AfterContentInit, OnDestroy {
    @ContentChildren(OptionComponent)
    options: QueryList<OptionComponent>;

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

    set value(value: any) {
        this.open = false;
        this.focus = false;
        if (value === this._value) {
            return;
        }
        this._value = value;
        if (this.registerOnChangeFn) {
            this.registerOnChangeFn(this._value);
        }
        if (this.registerOnTouchedFn) {
            this.registerOnTouchedFn(this._value);
        }
        this.change.emit(this._value);
        this.options.forEach((option: OptionComponent) => {
            if (option.selected) {
                this.text = option.text;
            }
        });
    };

    get value() {
        return this._value;
    };

    open: boolean = false;
    text: string = '';

    private _value = '';
    private registerOnChangeFn: (_: any) => any;
    private registerOnTouchedFn: (_: any) => any;
    private subs: Array<Subscription> = [];

    ngAfterContentInit() {
        this.options.forEach((option: OptionComponent) => {
            let sub = option.checked.subscribe((params: OptionComponent) => {
                this.value = params.value;
            });
            this.subs.push(sub);
        });
    }
    ngOnDestroy() {
        this.subs.forEach(item => {
            item.unsubscribe();
        });
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
        let isReadonly = (this as any).hasOwnProperty('readonly');
        isReadonly = isReadonly && this.readonly !== false;
        let isDisabled = (this as any).hasOwnProperty('disabled');
        isDisabled = isDisabled && this.disabled !== false;
        if (!isDisabled && !isReadonly) {
            this.open = !this.open;
            this.focus = true;
        }
    }

    escape() {
        this.open = false;
        this.focus = false;
    }
}