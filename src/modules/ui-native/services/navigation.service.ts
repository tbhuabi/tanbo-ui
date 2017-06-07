import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { RouterOutLetComponent } from '../components/router-outlet/router-outlet.component';

@Injectable()
export class NavigationService {
    component$: Observable<any>;
    popEvent$: Observable<any>;

    private componentSource = new Subject<any>();
    private popEventSource = new Subject<any>();

    constructor() {
        this.component$ = this.componentSource.asObservable();
        this.popEvent$ = this.popEventSource.asObservable();
    }

    publish(component: any, outlet: RouterOutLetComponent) {
        this.componentSource.next({
            component,
            activateView: outlet
        });
    }

    pop(host: RouterOutLetComponent) {
        this.popEventSource.next(host);
    }
}