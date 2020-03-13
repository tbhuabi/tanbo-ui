import { Injectable, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalController {
  showEvent = new Subject<TemplateRef<any>>();
  hideEvent = new Subject<TemplateRef<any>>();
  hideAllEvent = new Subject();

  show(template: TemplateRef<any>) {
    this.showEvent.next(template);
  }

  hide(template?: TemplateRef<any>) {
    this.hideEvent.next(template);
  }

  hideAll() {
    this.hideAllEvent.next();
  }
}
