import { Injectable } from '@angular/core';

export interface DialogConfig {
    title: string;
    content: string
}

@Injectable()
export class DialogService {

    show(params: DialogConfig): Promise<any> {
        return new Promise((resolve, reject) => {
            let n = Math.random();
            console.log(n);
            if (n > 0.5) {
                resolve('ok');
            } else {
                reject('error');
            }
        });
    }
}