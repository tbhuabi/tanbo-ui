import { Component, Output, EventEmitter, HostListener } from '@angular/core';
@Component({
    selector: 'ui-dropdown-fixed',
    templateUrl: './dropdown-fixed.component.html'
})
export class DropdownFixedComponent {
    @Output()
    trigger = new EventEmitter();

    @HostListener('click') click() {
        this.trigger.emit();
    }
}