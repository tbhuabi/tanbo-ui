import { Component, Input, HostBinding, HostListener } from '@angular/core';
@Component({
    selector: 'ui-radio',
    templateUrl: './radio.component.html'
})
export class RadioComponent {
    @Input()
    checkedIcon: string = 'icon icon-radio-checked';
    @Input()
    uncheckedICon: string = 'icon icon-radio-unchecked';
    @Input()
    @HostBinding('class.checked')
    checked: boolean = false;

    @HostListener('click') click() {
        this.checked = !this.checked;
    }
}