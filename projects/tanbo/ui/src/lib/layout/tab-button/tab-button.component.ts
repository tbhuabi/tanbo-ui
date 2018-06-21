import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Component({
    selector: 'ui-tab-button',
    templateUrl: './tab-button.component.html'
})
export class TabButtonComponent {
    @HostBinding('class.ui-active')
    @Input()
    active: boolean = false;
    @Output()
    selected = new EventEmitter();

    @HostListener('click') click() {
        this.selected.emit();
    }
}