import {
    Component,
    ContentChildren,
    QueryList,
    AfterViewInit,
    Input,
    Output,
    OnDestroy,
    EventEmitter,
    ChangeDetectorRef,
    HostBinding
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';

import { OptionComponent } from './option/option.component';

@Component({
    selector: 'ui-select',
    templateUrl: './select.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: SelectComponent,
        multi: true
    }]
})
export class SelectComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
    @ContentChildren(OptionComponent)
    options: QueryList<OptionComponent>;

    @HostBinding('class.focus')
    focus: boolean = false;
    @Input()
    disabled: boolean;
    @Input()
    readonly: boolean;
    @Input()
    name: string = '';
    @Output()
    change = new EventEmitter<string>();
    @Input()
    selectedIndex: number = 0;

    open: boolean = false;
    text: string = '';

    private value: string = '';
    private onChange: (_: any) => any;
    private onTouched: (_: any) => any;
    private subs: Array<Subscription> = [];
    private isWrite: boolean = false;

    constructor(private changeDetectorRef: ChangeDetectorRef) {
    }

    ngAfterViewInit() {
        let defaultOption: OptionComponent;
        this.options.forEach((option: OptionComponent, index: number) => {
            if (option.selected) {
                defaultOption = option;
                this.selectedIndex = index;
            }
            let sub = option.checked.subscribe((params: OptionComponent) => {
                this.value = params.value;
                this.text = params.text;
                this.focus = false;
                this.open = false;
                this.options.forEach((o: OptionComponent, i: number) => {
                    o.selected = false;
                    if (o === params) {
                        this.selectedIndex = i;
                    }
                });
                params.selected = true;
                if (this.onChange) {
                    this.onChange(this.value);
                }
                if (this.onTouched) {
                    this.onTouched(this.value);
                }
                this.change.emit(this.value);
            });
            this.subs.push(sub);
        });
        if (!defaultOption) {
            defaultOption = this.options.toArray()[this.selectedIndex];
        }
        if (!defaultOption) {
            defaultOption = this.options.first;
            this.selectedIndex = 0;
        }
        if (defaultOption) {
            this.value = defaultOption.value;
            this.text = defaultOption.text;
            this.changeDetectorRef.detectChanges();
            setTimeout(() => {
                if (this.isWrite) {
                    defaultOption.selected = true;
                }
            });
        }
    }

    ngOnDestroy() {
        this.subs.forEach(item => {
            item.unsubscribe();
        });
    }

    writeValue(value: any) {
        this.isWrite = true;
        this.value = value;
        if (this.options) {
            let selectedOption: OptionComponent;
            this.options.forEach((item: OptionComponent) => {
                item.selected = false;
                if (`${item.value}` === `${value}`) {
                    selectedOption = item;
                }
            });
            if (selectedOption) {
                this.text = selectedOption.text;
                selectedOption.selected = true;
            } else {
                this.text = '';
            }
        } else {
            this.text = '';
        }
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
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