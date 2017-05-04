import { Component, Input, HostBinding, HostListener } from '@angular/core';
@Component({
    selector: 'ui-checkbox',
    templateUrl: './checkbox.component.html'
})
export class CheckboxComponent {
    @Input()
    checkedIcon: string = 'icon icon-checkbox-checked';
    @Input()
    uncheckedICon: string = 'icon icon-checkbox-unchecked';
    @Input()
    @HostBinding('class.checked')
    checked: boolean = false;

    @HostListener('click') click() {
        this.checked = !this.checked;
    }
}