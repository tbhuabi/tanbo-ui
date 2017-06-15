import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { ViewHost } from '../utils/views';
import { PageTransition, AnimationType } from '../utils/view-transition-animate';

export interface ViewConfig {
    component: any;
    host: ViewHost;
    transition: PageTransition;
}

@Injectable()
export class NavigationService {
    view$: Observable<ViewConfig>;
    popEvent$: Observable<any>;

    private viewSource = new Subject<ViewConfig>();
    private popEventSource = new Subject<any>();

    constructor() {
        this.view$ = this.viewSource.asObservable();
        this.popEvent$ = this.popEventSource.asObservable();
    }

    publish(component: any, outlet: ViewHost, transition: PageTransition = {
        activate: AnimationType.SlideInRight,
        reactivate: AnimationType.FadeInLeft,
        destroy: AnimationType.SlideOutRight,
        toStack: AnimationType.FadeOutLeft
    }) {
        this.viewSource.next({
            component,
            host: outlet,
            transition
        });
    }

    pop(host: ViewHost) {
        this.popEventSource.next(host);
    }
}