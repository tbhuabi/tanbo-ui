import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { RouterOutLetComponent } from '../components/router-outlet/router-outlet.component';

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

    publish(component: any, outlet: RouterOutLetComponent) {
        this.viewSource.next({
            component,
            activateView: outlet
        });
    }

    pop(host: RouterOutLetComponent) {
        this.popEventSource.next(host);
    }
}