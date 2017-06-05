import { Component, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
    selector: 'ui-tab-bar-item',
    templateUrl: './tab-bar-item.component.html'
})
export class TabBarItemComponent {
    @Output()
    selected = new EventEmitter();

    @HostListener('click') click() {
        this.selected.emit();
    }
}