import { Injectable, TemplateRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface DrawerConfig {
  direction?: 'left' | 'top' | 'right' | 'bottom';
  content: TemplateRef<any>;
}

@Injectable({
  providedIn: 'root'
})
export class DrawerController {
  onShow: Observable<DrawerConfig>;
  onHide: Observable<void>;
  private showEvent = new Subject<DrawerConfig>();
  private hideEvent = new Subject<void>();

  constructor() {
    this.onShow = this.showEvent.asObservable();
    this.onHide = this.hideEvent.asObservable();
  }

  show(config: DrawerConfig) {
    this.showEvent.next(config);
    return new Promise((resolve) => {
      const sub = this.onHide.subscribe(() => {
        resolve();
        sub.unsubscribe();
      });
    });
  }

  hide() {
    this.hideEvent.next();
  }
}
