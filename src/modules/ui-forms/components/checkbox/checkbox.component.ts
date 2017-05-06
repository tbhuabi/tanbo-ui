import { Component, Input, Output, HostListener, EventEmitter } from '@angular/core';

import { InputType } from '../../utils/input-type';

@Component({
    selector: 'ui-checkbox',
    templateUrl: './checkbox.component.html'
})
export class CheckboxComponent implements InputType {
    @Input()
    disabled: boolean = false;
    @Input()
    readonly: boolean = false;
    @Input()
    checked: boolean = false;
    @Input()
    checkedIcon: string = '';
    @Input()
    uncheckedIcon: string = 'icon icon-checkbox-unchecked';

    @HostListener('click') click() {
        if (this.disabled || this.readonly) {
            return;
        }
        this.change.emit(!this.checked);
    }

    @Output()
    change = new EventEmitter<boolean>();
}