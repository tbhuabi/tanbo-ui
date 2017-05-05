import {
    Component, Input, Output, EventEmitter, ViewContainerRef, ElementRef, AfterViewInit,
    HostBinding, HostListener
} from '@angular/core';
import { SelectComponent } from '../select/select.component';
@Component({
    selector: 'ui-option',
    templateUrl: './option.component.html'
})
export class OptionComponent implements AfterViewInit {
    @Input()
    value: string = '';
    @Input()
    disabled: boolean = false;
    @Output()
    checked = new EventEmitter<OptionComponent>();
    text: string = '';

    @Input()
    @HostBinding('class.selected')
    get selected() {
        if (this._selected) {
            return true;
        }
        if (this.parentComponent instanceof SelectComponent) {
            return this.value === this.parentComponent.value;
        }
        return false;
    };
    set selected(isSelected: any) {
        if (isSelected !== false) {
            this._selected = true;
        }
        this._selected = false;
    }
    @HostBinding('class.disabled')
    get isDisabled() {
        let isDisabled = (this as any).hasOwnProperty('disabled');
        return isDisabled && this.disabled !== false;
    }

    private parentComponent: SelectComponent;
    private _selected: boolean = false;

    constructor(private viewContainerRef: ViewContainerRef,
                private elementRef: ElementRef) {
    }

    @HostListener('click') click() {
        if (!this.isDisabled) {
            this.checked.emit(this);
        }
    }

    ngAfterViewInit() {
        this.parentComponent = this.viewContainerRef.parentInjector.get(SelectComponent);
        this.text = this.elementRef.nativeElement.innerText;
    }
}