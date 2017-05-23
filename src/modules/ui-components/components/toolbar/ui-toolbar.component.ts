import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
@Component({
    selector: 'ui-toolbar',
    templateUrl: './ui-toolbar.component.html'
})
export class ToolbarComponent implements OnInit {
    distanceTop: number = 0;
    timer: any = null;

    constructor(@Inject(DOCUMENT) private document: Document) {
    }

    @HostListener('window:scroll')
    ngOnInit() {
        this.distanceTop = this.document.body.scrollTop;
    }

    toTop() {
        let n = 0;
        let m = 20;
        let rawDistance = this.distanceTop;
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            n++;
            let a = n / m;
            this.document.body.scrollTop = rawDistance * (1 - Math.pow(a, 3));
            if (n === m) {
                clearInterval(this.timer);
            }
        }, 20);
    }
}