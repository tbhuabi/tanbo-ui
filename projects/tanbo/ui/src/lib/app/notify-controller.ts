import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

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
