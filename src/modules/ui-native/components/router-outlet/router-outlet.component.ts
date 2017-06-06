import { Component, OnInit } from '@angular/core';
import { trigger, style, state, animate, transition, keyframes } from '@angular/animations';

import { NavControllerService } from '../../services/nav-controller.service';

@Component({
    selector: 'ui-router-outlet',
    templateUrl: './router-outlet.component.html',
    animations: [trigger('routerAnimations', [state('outLeft', style({
        transform: 'translateX(-50%)',
        opacity: 0
    })), transition('* => inRight', animate('300ms ease-out', keyframes([
        style({
            transform: 'translateX(100%)',
            offset: 0
        }),
        style({
            transform: 'translateX(0)',
            offset: 1
        })
    ]))), transition('* => inLeft', animate('300ms ease-out', keyframes([
        style({
            opacity: 0.5,
            transform: 'translateX(-50%)',
            offset: 0
        }),
        style({
            opacity: 1,
            transform: 'translateX(0)',
            offset: 1
        })
    ]))), transition('* => outRight', animate('300ms ease-out', keyframes([
        style({
            transform: 'translateX(0)',
            offset: 0
        }),
        style({
            transform: 'translateX(100%)',
            offset: 1
        })
    ]))), transition('* => outLeft', animate('300ms ease-out', keyframes([
        style({
            opacity: 1,
            transform: 'translateX(0)',
            offset: 0
        }),
        style({
            opacity: 0.5,
            transform: 'translateX(-50%)',
            offset: 1
        })
    ])))])]
})
export class RouterOutLetComponent implements OnInit {
    views: Array<any> = [];

    constructor(private navControllerService: NavControllerService) {
    }

    ngOnInit() {
        this.navControllerService.setActivateView(this);
        this.navControllerService.component$.subscribe((viewConfig: any) => {
            if (viewConfig.activateView !== this) {
                return;
            }
            this.views.forEach(item => {
                item.state = 'outLeft';
            });
            this.views.push({
                component: viewConfig.component,
                state: this.views.length ? 'inRight' : ''
            });
        });

        this.navControllerService.popEvent$.subscribe((activateView: any) => {
            if (activateView !== this) {
                return;
            }
            let lastItem = this.views[this.views.length - 1];
            if (lastItem) {
                lastItem.state = 'outRight';
            }
            let currentItem = this.views[this.views.length - 2];
            if (currentItem) {
                currentItem.state = 'inLeft';
            }
        });
    }

    destroy() {
        let lastItem = this.views[this.views.length - 1];
        if (lastItem && lastItem.state === 'outRight') {
            this.views.pop();
        }
    }
}