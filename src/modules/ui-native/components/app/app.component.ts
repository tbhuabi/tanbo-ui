import { Component, OnInit, Inject, HostListener, Input, AfterViewInit, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { NavigationService } from '../../services/navigation.service';
import { RouterOutLetComponent } from '../router-outlet/router-outlet.component';

@Component({
    selector: 'ui-app',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit {
    @Input()
    rootPage: any;
    @ViewChild(RouterOutLetComponent)
    host: RouterOutLetComponent;
    @Input()
    baseFontSize: number = 100;

    private htmlElement: HTMLElement;
    private defaultDocWidth: number = 320;

    constructor(@Inject(DOCUMENT) private document: Document,
                private navigationService: NavigationService) {
    }

    ngOnInit() {
        this.htmlElement = this.document.querySelector('html');
        this.resize();
    }

    ngAfterViewInit() {
        this.navigationService.publish(this.rootPage, this.host);
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