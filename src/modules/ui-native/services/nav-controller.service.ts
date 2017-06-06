import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class NavControllerService {
    component$: Observable<any>;
    popEvent$: Observable<any>;

    private componentSource = new Subject<any>();
    private popEventSource = new Subject<any>();
    private activateView: any;

    constructor() {
        this.component$ = this.componentSource.asObservable();
        this.popEvent$ = this.popEventSource.asObservable();
    }

    publish(component: any) {
        this.componentSource.next({
            component,
            activateView: this.activateView
        });
    }

    pop() {
        this.popEventSource.next(this.activateView);
    }

    setActivateView(component: any) {
        this.activateView = component;
    }
}