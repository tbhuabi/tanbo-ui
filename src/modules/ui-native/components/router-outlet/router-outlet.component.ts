import { Component, OnInit } from '@angular/core';
import { trigger, style, state, animate, transition } from '@angular/animations';

import { NavControllerService } from '../../services/nav-controller.service';

@Component({
    selector: 'ui-router-outlet',
    templateUrl: './router-outlet.component.html',
    animations: [trigger('routerAnimations', [state('activate', style({
        transform: 'translate3d(100px, 0, 0)',
        opacity: 0
    })), state('inactive', style({
        transform: 'translate3d(100px, 0, 0)',
        opacity: 0
    })), state('activated', style({
        transform: 'translate3d(0, 0, 0)',
        opacity: 1
    })), transition('activate => activated', animate(300))])]
})
export class RouterOutLetComponent implements OnInit {
    views: Array<any> = [];

    constructor(private navControllerService: NavControllerService) {
    }

    ngOnInit() {
        this.navControllerService.component$.subscribe((component: any) => {
            this.views.forEach(item => {
                item.state = 'inactive';
            });
            if (this.views.length) {
                let currentView = this.views[this.views.length - 1];
                currentView.state = 'activated';
            }
            this.views.push({
                component,
                state: this.views.length ? 'activate' : 'activated'
            });
        });

        this.navControllerService.backEvent$.subscribe(() => {
            this.views.pop();
        });
    }
}