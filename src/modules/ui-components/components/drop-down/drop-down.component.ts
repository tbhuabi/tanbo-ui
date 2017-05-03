import { Component, Input, Renderer2, OnInit, EventEmitter, Output } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'ui-drop-down',
    templateUrl: './drop-down.component.html',
    styleUrls: ['./drop-down.component.scss'],
    animations: [
        trigger('inout', [
            state('in', style({
                opacity: 0,
                transform: 'scaleY(0)'
            })),
            state('out', style({
                opacity: 1,
                transform: 'scaleY(1)'
            })),
            transition('in <=> out', animate('100ms ease-in'))
        ])
    ]
})

export class DropDownComponent implements OnInit {
    @Input()
    placement: string = 'bottom';
    @Input()
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
