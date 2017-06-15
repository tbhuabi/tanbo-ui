import { Component, OnInit } from '@angular/core';
import { trigger } from '@angular/animations';

import { NavigationService, ViewConfig } from '../../services/navigation.service';
import { LifeCycleService } from '../../services/life-cycle.service';
import { EventType } from '../../utils/event';
import { ViewHost } from '../../utils/views';
import { pageTransitionAnimate, AnimationTypeBase } from '../../utils/view-transition-animate';

@Component({
    selector: 'ui-views',
    templateUrl: './views.component.html',
    animations: [trigger('pageAnimations', pageTransitionAnimate)]
})
export class ViewsComponent extends ViewHost implements OnInit {
    views: Array<any> = [];
    self: ViewsComponent;

    constructor(public navigationService: NavigationService,
                private lifeCycleService: LifeCycleService) {
        super();
        this.self = this;
    }

    ngOnInit() {
        this.navigationService.view$.subscribe((viewConfig: ViewConfig) => {
            if (viewConfig.host !== this) {
                return;
            }
            let lastItem = this.views[this.views.length - 1];
            if (lastItem) {
                lastItem.state = AnimationTypeBase[viewConfig.transition.toStack];
            }
            this.views.push({
                viewConfig,
                state: this.views.length ? AnimationTypeBase[viewConfig.transition.activate] : ''
            });
        });

        this.navigationService.popEvent$.subscribe((activateView: any) => {
            if (activateView !== this) {
                return;
            }
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