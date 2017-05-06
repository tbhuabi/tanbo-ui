import { Component, Input, Output, EventEmitter } from '@angular/core';

import { InputType } from '../../utils/input-type';

@Component({
    selector: 'ui-input-range',
    templateUrl: './range.component.html'
})
export class RangeComponent implements InputType {
    @Input()
    disabled: boolean = false;
    @Input()
    readonly: boolean = false;

    @Output()
    change = new EventEmitter<number>();
}