import { Component, OnInit } from '@angular/core';
import { trigger } from '@angular/animations';

import { LifeCycleService } from './life-cycle.service';
import { NavController, ViewConfig } from './navigation-controller';
import { EventType } from '../../utils/event';
import { pageTransitionAnimate, AnimationTypeBase } from './view-transition-animate';

@Component({
    selector: 'ui-views',
    templateUrl: './views.component.html',
    animations: [trigger('pageAnimations', pageTransitionAnimate)],
    providers: [
        LifeCycleService
    ]
})
export class ViewsComponent implements OnInit {
    views: Array<any> = [];

    constructor(
        private navController: NavController,
        private lifeCycleService: LifeCycleService) {
    }

    ngOnInit() {
        this.navController.pushEvent$.subscribe((viewConfig: ViewConfig) => {
            let lastItem = this.views[this.views.length - 1];
            if (lastItem) {
                lastItem.state = AnimationTypeBase[viewConfig.transition.toStack];
            }
            this.views.push({
                viewConfig,
                state: this.views.length ? AnimationTypeBase[viewConfig.transition.activate] : ''
            });
        });

        this.navController.popEvent$.subscribe(() => {

            let lastItem = this.views[this.views.length - 1];
            if (lastItem) {
                lastItem.state = AnimationTypeBase[lastItem.viewConfig.transition.destroy];
            }
            let currentItem = this.views[this.views.length - 2];
            if (currentItem) {
                currentItem.state = AnimationTypeBase[lastItem.viewConfig.transition.reactivate];
            }
        });
    }

    destroy() {
        let lastItem = this.views[this.views.length - 1];
        if (lastItem && lastItem.state === AnimationTypeBase[lastItem.viewConfig.transition.destroy]) {
            this.views.pop();
        }
    }

    lifeCycle(item: any) {
        let enterStatus = [
            AnimationTypeBase[item.viewConfig.transition.reactivate],
            AnimationTypeBase[item.viewConfig.transition.activate],
            ''
        ];
        let leaveStatus = [
            AnimationTypeBase[item.viewConfig.transition.toStack],
            AnimationTypeBase[item.viewConfig.transition.destroy]
        ];
        if (enterStatus.indexOf(item.state) !== -1) {
            this.lifeCycleService.publishEvent({
                component: item.viewConfig.component,
                type: EventType.Enter
            });
        } else if (leaveStatus.indexOf(item.state) !== -1) {
            this.lifeCycleService.publishEvent({
                component: item.viewConfig.component,
                type: EventType.Leave
            });
        }
    }
}