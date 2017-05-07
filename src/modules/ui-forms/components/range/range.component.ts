import { Component, Input, ViewChild, Output, ElementRef, EventEmitter } from '@angular/core';
import { EventManager } from '@angular/platform-browser';

import { InputType } from '../../utils/input-type';

@Component({
    selector: 'ui-input-range',
    templateUrl: './range.component.html'
})
export class RangeComponent implements InputType {
    @ViewChild('rangeBar') rangeBar: ElementRef;

    @Input()
    set disabled(isDisabled: any) {
        this._disabled = isDisabled;
    }

    get disabled() {
        let isDisabled = (this as any).hasOwnProperty('_disabled');
        return isDisabled && this._disabled !== false;
    }

    @Input()
    set readonly(isReadonly: any) {
        this._readonly = isReadonly;
    }

    get readonly() {
        let isReadonly = (this as any).hasOwnProperty('_readonly');
        return isReadonly && this._readonly !== false;
    }

    @Output()
    change = new EventEmitter<number>();

    position: number = 50;

    private _disabled: boolean;
    private _readonly: boolean;

    constructor(private elementRef: ElementRef,
                private eventManager: EventManager) {

    }

    drag(event: any) {
        let maxWidth = this.elementRef.nativeElement.offsetWidth;
        let nowWidth = this.rangeBar.nativeElement.offsetWidth;
        let oldX = event.clientX;
        let mouseMoveUnbindFn = this.eventManager.addGlobalEventListener('document', 'mousemove', (ev) => {
            let dragDistance = ev.clientX - oldX;
            let p = (nowWidth + dragDistance) / maxWidth * 100;
            if (p < 0) {
                p = 0;
            } else if (p > 100) {
                p = 100;
            }
            this.position = p;
        });
        let moseUpUnbindFn = this.eventManager.addGlobalEventListener('document', 'mouseup', () => {
            mouseMoveUnbindFn();
            moseUpUnbindFn();
        });
    }
}