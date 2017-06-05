import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface OnViewEnter {
    uiOnViewEnter: () => any;
}

export interface OnViewLeave {
    uiOnViewLeave: () => any;
}

interface ViewConfig {
    component: any;
    params: { [key: string]: any }
}

@Injectable()
export class NavController {
    params$: Observable<{ [key: string]: any }>;
    private views: Array<ViewConfig> = [];
    private paramsSource = new Subject<{ [key: string]: any }>();

    constructor() {
        this.params$ = this.paramsSource.asObservable();
    }

    push(component: any, params: { [key: string]: any }) {
        this.views.push({
            component,
            params
        });
        this.paramsSource.next(params);
    }

    pop(params: { [key: string]: any }) {
        this.views.pop();
        this.paramsSource.next(params);
    }
}