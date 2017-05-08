import { Directive, ElementRef, Renderer2, OnDestroy, Input, OnInit } from '@angular/core';
@Directive({
    selector: '[uiStopPropagation]'
})
export class StopPropagationDirective implements OnInit, OnDestroy {
    @Input()
    stopPropagation: Array<string> | string = 'click';

    private callbacks: Array<any> = [];

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {
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

    ngOnDestroy() {
        this.callbacks.forEach(fn => {
            fn();
        });
    }

    private addEvent(eventType: string) {
        let fn = this.renderer.listen(this.elementRef.nativeElement, eventType, (ev: any) => {
            ev.stopPropagation();
        });
        this.callbacks.push(fn);
    }
}
