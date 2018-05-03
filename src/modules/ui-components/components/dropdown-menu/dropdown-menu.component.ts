import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
@Component({
    selector: 'ui-dropdown-menu',
    templateUrl: './dropdown-menu.component.html'
})
export class DropdownMenuComponent implements OnInit {
    constructor(private elementRef: ElementRef, private renderer: Renderer2) {

    }

    ngOnInit() {
        this.renderer.listen(this.elementRef.nativeElement, 'click', (ev: any) => {
            ev.stopPropagation();
        });
    }
}