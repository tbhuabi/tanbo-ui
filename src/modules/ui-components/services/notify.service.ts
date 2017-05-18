import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export class NotifyConfig {
    autoHide: boolean;
    content: string;
    type?: string;
    time?: number;
}

@Injectable()
export class NotifyService {
    notify$: Observable<NotifyConfig>;
    private notifySource = new Subject<NotifyConfig>();

    constructor() {
        this.notify$ = this.notifySource.asObservable();
    }

    push(config: NotifyConfig) {
        this.notifySource.next(config);
    }
}