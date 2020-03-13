import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

export interface DialogConfig {
  content: string;
  title?: string;
  confirmBtnText?: string;
  cancelBtnText?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DialogController {
  config = new Subject<DialogConfig | string>();
  checkState = new Subject<boolean>();

  dialog(config: DialogConfig | string) {
    this.config.next(config);
    return new Promise<boolean>(resolve => {
      const sub = this.checkState.subscribe(b => {
        resolve(b);
        sub.unsubscribe();
      });
    });
  }
}
