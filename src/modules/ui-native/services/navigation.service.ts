import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { ViewsComponent } from '../components/views/views.component';

@Injectable()
export class NavigationService {
    view$: Observable<any>;
    popEvent$: Observable<any>;

    private viewSource = new Subject<any>();
    private popEventSource = new Subject<any>();

    constructor() {
        this.view$ = this.viewSource.asObservable();
        this.popEvent$ = this.popEventSource.asObservable();
    }

    publish(component: any, outlet: ViewsComponent) {
        this.viewSource.next({
            component,
            activateView: outlet
        });
    }

    pop(host: ViewsComponent) {
        this.popEventSource.next(host);
    }
}