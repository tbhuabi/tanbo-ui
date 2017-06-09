import { Component, OnInit } from '@angular/core';
import { trigger, style, state, animate, transition, keyframes } from '@angular/animations';

import { NavigationService } from '../../services/navigation.service';
import { LifeCycleService } from '../../services/life-cycle.service';
import { EventType } from '../../utils/event';

@Component({
    selector: 'ui-router-outlet',
    templateUrl: './router-outlet.component.html',
    animations: [trigger('routerAnimations', [state('outLeft', style({
        transform: 'translateX(-50%)',
        opacity: 0
    })), transition('* => inRight', animate('250ms ease-out', keyframes([
        style({
            transform: 'translateX(100%)',
            offset: 0
        }),
        style({
            transform: 'translateX(0)',
            offset: 1
        })
    ]))), transition('* => inLeft', animate('250ms ease-out', keyframes([
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
    ]))), transition('* => outRight', animate('250ms ease-out', keyframes([
        style({
            transform: 'translateX(0)',
            offset: 0
        }),
        style({
            transform: 'translateX(100%)',
            offset: 1
        })
    ]))), transition('* => outLeft', animate('250ms ease-out', keyframes([
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
    self: RouterOutLetComponent;

    constructor(public navigationService: NavigationService,
                private lifeCycleService: LifeCycleService) {
        this.self = this;
    }

    ngOnInit() {
        this.navigationService.component$.subscribe((viewConfig: any) => {
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

        this.navigationService.popEvent$.subscribe((activateView: any) => {
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

    lifeCycle(item: any) {
        if (['inLeft', 'inRight', ''].indexOf(item.state) !== -1) {
            this.lifeCycleService.publishEvent({
                component: item.component,
                type: EventType.Enter
            });
        } else if (['outLeft', 'outRight'].indexOf(item.state) !== -1) {
            this.lifeCycleService.publishEvent({
                component: item.component,
                type: EventType.Leave
            });
        }
    }
}