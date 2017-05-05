import { Component, HostBinding, Input, Renderer2, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'ui-drop-down',
    templateUrl: './drop-down.component.html'
})

export class DropDownComponent implements OnInit {
    @Input()
    placement: string = 'bottom';
    @Input()
    @HostBinding('class.open')
    open: boolean = false;
    @Output()
    escape = new EventEmitter();
    @Output()
    trigger = new EventEmitter();

    private isTriggerEvent: boolean = false;

    constructor(private renderer: Renderer2) {
    }

    ngOnInit() {
        this.renderer.listen('document', 'click', () => {
            if (!this.isTriggerEvent) {
                this.escape.emit();
            }
            this.isTriggerEvent = false;
        });
    }

    onTrigger() {
        this.isTriggerEvent = true;
        this.trigger.emit();
    }
}
