import { Component, Input, ViewContainerRef, ElementRef, OnInit } from '@angular/core';
import { SelectComponent } from '../select/select.component';
@Component({
    selector: 'ui-option',
    templateUrl: './option.component.html',
    styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {
    @Input()
    value: string = '';

    get selected() {
        if (this.parentComponent instanceof SelectComponent) {
            return this.value === this.parentComponent.value;
        }
        return false;
    };

    private parentComponent: SelectComponent;

    constructor(private viewContainerRef: ViewContainerRef, private elementRef: ElementRef) {
    }

    ngOnInit() {
        this.parentComponent = this.viewContainerRef.parentInjector.get(SelectComponent);
    }

    updateSelectValue() {
        if (this.parentComponent instanceof SelectComponent) {
            this.parentComponent.text = this.elementRef.nativeElement.innerText;
            this.parentComponent.value = this.value;
        }
    }
}