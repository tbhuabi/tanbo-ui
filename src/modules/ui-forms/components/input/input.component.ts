import {
    Component,
    Input,
    Output,
    OnInit,
    EventEmitter,
    ViewChild,
    ComponentFactoryResolver,
    ComponentFactory,
    ElementRef,
    HostBinding,
    OnChanges,
    OnDestroy
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';

import { InputHostDirective } from '../../directives/input-host.directive';
import { InputStateService } from '../../services/input-state.service';

import { CheckboxComponent } from './checkbox/checkbox.component';
import { RadioComponent } from './radio/radio.component';
import { RangeComponent } from './range/range.component';

import { InputType } from '../../utils/input-type';

@Component({
    selector: 'ui-input',
    templateUrl: './input.component.html',
    entryComponents: [
        CheckboxComponent,
        RadioComponent,
        RangeComponent
    ],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: InputComponent,
        multi: true
    }]
})
export class InputComponent implements ControlValueAccessor, OnChanges, OnDestroy, OnInit {
    @Input()
    @HostBinding('class.disabled')
    disabled: boolean = false;
    @Input()
    @HostBinding('class.readonly')
    readonly: boolean = false;
    @Input()
    @HostBinding('class.checked')
    checked: boolean = false;
    @Input()
    name: string;
    @Input()
    value: string;
    @Input()
    max: string | number;
    @Input()
    min: string | number;
    @Input()
    step: string | number;
    @Input()
    checkedIcon: string;
    @Input()
    uncheckedICon: string;
    @Input()
    id: string;
    @Output()
    change = new EventEmitter<any>();

    @ViewChild(InputHostDirective)
    inputHost: InputHostDirective;
    @ViewChild('rawInput')
    rawInput: ElementRef;

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
            case 'range':
                this.inputComponentFactory = this.componentFactoryResolver.resolveComponentFactory(RangeComponent);
                this.renderInputComponent();
        }
    }

    get type() {
        return this._type;
    }

    private _type: string;

    private onChange: (_: any) => any;
    private onTouched: (_: any) => any;
    private inputComponentFactory: ComponentFactory<InputType>;
    private componentInstance: any;
    private sub: Subscription;
    private inputStateSub: Subscription;

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private inputStateService: InputStateService) {
    }

    ngOnInit() {
        this.inputStateSub = this.inputStateService.state$.subscribe((c: any) => {
            switch (this.type) {
                case 'checkbox':
                    break;
                case 'radio':
                    if (c !== this) {
                        this.checked = this.rawInput.nativeElement.checked;
                    }
                    break;
            }
        });
    }

    ngOnChanges() {
        this.updateComponentStatus();
    }

    ngOnDestroy() {
        if (this.inputStateSub) {
            this.inputStateSub.unsubscribe();
        }
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    renderInputComponent() {
        this.ngOnDestroy();
        let viewContainerRef = this.inputHost.viewContainerRef;
        viewContainerRef.clear();
        let componentRef = viewContainerRef.createComponent(this.inputComponentFactory);
        this.componentInstance = (<InputType> componentRef.instance);
        this.sub = this.componentInstance.change.subscribe((params: boolean | number) => {
            switch (this.type) {
                case 'checkbox':
                    this.checked = !!params;
                    break;
                case 'radio':
                    this.checked = true;
                    this.rawInput.nativeElement.checked = true;
                    break;
                case 'range':
                    this.value = params + '';
                    break;
            }
            if (this.onChange) {
                this.onChange(params);
            }
            if (this.onTouched) {
                this.onTouched(params);
            }
            this.inputStateService.publishState(this);
            this.change.emit(this);
            this.updateComponentStatus();
        });
        this.updateComponentStatus();
    }

    updateComponentStatus() {
        if (!this.componentInstance) {
            return;
        }
        this.componentInstance.checked = this.checked;
        this.componentInstance.disabled = this.disabled;
        this.componentInstance.readonly = this.readonly;
        this.componentInstance.value = this.value;
        if (this.type === 'checkbox' || this.type === 'radio') {
            this.componentInstance.checkedIcon = this.checkedIcon;
            this.componentInstance.uncheckedIcon = this.uncheckedICon;
        }
        if (this.type === 'range') {
            this.componentInstance.max = this.max;
            this.componentInstance.min = this.min;
            this.componentInstance.step = this.step;
        }
    }

    writeValue(value: any) {
        switch (this.type) {
            case 'checkbox':
                this.checked = !!value;
                break;
            case 'radio':
                if (typeof value === 'number') {
                    this.checked = this.value === ('' + value);
                } else {
                    this.checked = this.value === value;
                }
                break;
            case 'range':
                this.value = value;
                break;
            default:
                this.value = value;
        }
        this.updateComponentStatus();
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
}