import { Component, ElementRef, OnInit } from '@angular/core';
@Component({
    selector: 'ui-drop-down-menu',
    templateUrl: './drop-down-menu.component.html'
})
export class DropDownMenuComponent implements OnInit {
    constructor(private elementRef: ElementRef) {

    }

    ngOnInit() {
        this.elementRef.nativeElement.addEventListener('click', ev => {
            ev.stopPropagation();
        });
    }
}