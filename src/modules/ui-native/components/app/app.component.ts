import { Component, OnInit, Inject, HostListener, Input, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { NavControllerService } from '../../services/nav-controller.service';

@Component({
    selector: 'ui-app',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit {
    @Input()
    set rootPage(component: any) {
        this.component = component;
    }

    @Input()
    baseFontSize: number = 100;

    private component: any;
    private htmlElement: HTMLElement;
    private defaultDocWidth: number = 320;

    constructor(@Inject(DOCUMENT) private document: Document,
                private navControllerService: NavControllerService) {
    }

    ngOnInit() {
        this.htmlElement = this.document.querySelector('html');
        this.resize();
    }

    ngAfterViewInit() {
        this.navControllerService.publish(this.component);
    }

    @HostListener('window:resize') resize() {
        if (!this.htmlElement) {
            return;
        }
        let docWidth = this.htmlElement.getBoundingClientRect().width;
        let scale = docWidth / this.defaultDocWidth;
        this.htmlElement.style.fontSize = `${scale * this.baseFontSize}px`;
    }
}