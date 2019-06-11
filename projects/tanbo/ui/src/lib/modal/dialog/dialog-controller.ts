import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface DialogConfig {
  content: string;
  title?: string;
  btnsText?: Array<string>;
}

@Injectable()
export class DialogController {
  config: Observable<DialogConfig | string>;
  private action: Observable<boolean>;
  private actionSource = new Subject<boolean>();
  private configSource = new Subject<DialogConfig | string>();

  constructor() {
    this.action = this.actionSource.asObservable();
    this.config = this.configSource.asObservable();
  }

  show(params: DialogConfig | string): Promise<any> {
    this.configSource.next(params);
    return new Promise((resolve) => {
      const sub = this.action.subscribe((result: boolean) => {
        resolve(result);
        sub.unsubscribe();
      });
    });
  }

  publishAction(result: boolean) {
    this.actionSource.next(result);
  }
}