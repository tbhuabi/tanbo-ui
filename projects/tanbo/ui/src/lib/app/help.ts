import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

export interface DialogConfig {
  content: string;
  title?: string;
  confirmBtnText?: string;
  cancelBtnText?: string;
}

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



export enum NotifyType {
  Default,
  Primary,
  Info,
  Warning,
  Success,
  Danger
}

export interface NotifyConfig {
  content: string;
  autoHide?: boolean;
  type?: NotifyType;
  time?: number;
}

@Injectable()
export class NotifyController {
  notify: Observable<NotifyConfig | string>;
  private notifySource = new Subject<NotifyConfig | string>();

  constructor() {
    this.notify = this.notifySource.asObservable();
  }

  push(config: NotifyConfig | string) {
    this.notifySource.next(config);
  }
}
