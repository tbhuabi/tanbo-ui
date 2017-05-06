import { Component, Input, ViewChild, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { InputHostDirective } from '../../directives/input-host.directive';

import { CheckboxComponent } from '../checkbox/checkbox.component';
import { RadioComponent } from '../radio/radio.component';

import { InputType } from '../../utils/input-type';

@Component({
    selector: 'ui-input',
    templateUrl: './input.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: InputComponent,
        multi: true
    }]
})
export class InputComponent implements ControlValueAccessor {
    @Input()
    disabled: boolean = false;
    @Input()
    readonly: boolean = false;
    @Input()
    checked: boolean = false;
    @Input()
    name: string = '';
    @Input()
    value: string = '';
    @Input()
    id: string = '';
    @Input()
    max: number | string;
    @Input()
    min: number | string;
    @Input()
    checkedIcon: string;
    @Input()
    uncheckedICon: string;

    @ViewChild(InputHostDirective)
    inputHost: InputHostDirective;

    @Input()
    set type(inputType: string) {
        this._type = inputType;
        switch (inputType) {
            case 'checkbox':
                this.inputComponentFactory = this.componentFactoryResolver.resolveComponentFactory(CheckboxComponent);
                this.renderInputComponent();
                break;
            case 'radio':
                this.inputComponentFactory = this.componentFactoryResolver.resolveComponentFactory(RadioComponent);
                this.renderInputComponent();
                break;
        }
    }

    get type() {
        return this._type;
    }

    private _type: string;
    private registerOnChangeFn: (_: any) => any;
    private registerOnTouchedFn: (_: any) => any;
    private inputComponentFactory: ComponentFactory<InputType>;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    }

    renderInputComponent() {
        let viewContainerRef = this.inputHost.viewContainerRef;
        viewContainerRef.clear();
        let componentRef = viewContainerRef.createComponent(this.inputComponentFactory);
        let componentInstance = (<InputType> componentRef.instance);
        componentInstance.checked = this.checked;
        componentInstance.disabled = this.disabled;
        componentInstance.readonly = this.readonly;
        if (this.type === 'checkbox' || this.type === 'radio') {
            componentInstance.checkedIcon = this.checkedIcon;
            componentInstance.uncheckedIcon = this.uncheckedICon;
        }
        if (this.type === 'range') {
            componentInstance.max = this.max;
            componentInstance.min = this.min;
        }

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
}