import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface DialogConfig {
    title: string;
    content: string;
}

@Injectable()
export class DialogService {
    dialogAction$: Observable<boolean>;
    dialogConfig$: Observable<DialogConfig>;
    dialogActionSource = new Subject<boolean>();
    private dialogConfigSource = new Subject<DialogConfig>();

    constructor() {
        this.dialogAction$ = this.dialogActionSource.asObservable();
        this.dialogConfig$ = this.dialogConfigSource.asObservable();
    }

    show(params: DialogConfig): Promise<any> {
        this.dialogConfigSource.next(params);
        return new Promise((resolve, reject) => {
            const sub = this.dialogAction$.subscribe((result: boolean) => {
                result ? resolve(result) : reject(result);
                sub.unsubscribe();
            })
        });
    }
}