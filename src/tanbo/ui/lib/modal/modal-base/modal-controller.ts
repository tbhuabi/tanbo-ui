import { Injectable, TemplateRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ModalController {
  template: Observable<TemplateRef<any>>;
  onHide: Observable<TemplateRef<any> | void>;
  private displayTemplate = new Subject<TemplateRef<any>>();
  private hideEvent = new Subject<TemplateRef<any> | void>();

  constructor() {
    this.template = this.displayTemplate.asObservable();
    this.onHide = this.hideEvent.asObservable();
  }

  show(template: TemplateRef<any>) {
    this.displayTemplate.next(template);
  }

  hide(template?: TemplateRef<any>) {
    this.hideEvent.next(template);
  }
}