import { Component, HostListener } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'ui-back',
    templateUrl: './back.component.html'
})
export class BackComponent {
    constructor(private location: Location) {
    }

    @HostListener('click') click() {
        this.location.back();
    }
}