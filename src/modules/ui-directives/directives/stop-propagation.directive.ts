import { Directive, ElementRef, Input, OnInit } from '@angular/core';
@Directive({
    selector: '[uiStopPropagation]'
})
export class StopPropagationDirective implements OnInit {
    @Input()
    stopPropagation: Array<string> | string = 'click';

    constructor(private el: ElementRef) {
    }

    ngOnInit() {
        if (typeof this.stopPropagation === 'string') {
            this.addEvent(this.stopPropagation);
        } else {
            this.stopPropagation.forEach(eventType => {
                this.addEvent(eventType);
            });
        }
    }

    private addEvent(eventType: string) {
        this.el.nativeElement.addEventListener(eventType, ev => {
            ev.stopPropagation();
        }, false);
    }
}
