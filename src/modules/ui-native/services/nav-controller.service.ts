import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class NavControllerService {
    component$: Observable<any>;
    backEvent$: Observable<any>;
    private componentSource = new Subject<any>();
    private backEventSource = new Subject<any>();

    constructor() {
        this.component$ = this.componentSource.asObservable();
        this.backEvent$ = this.backEventSource.asObservable();
    }

    publish(component: any) {
        this.componentSource.next(component);
    }

    pop() {
        this.backEventSource.next();
    }
}