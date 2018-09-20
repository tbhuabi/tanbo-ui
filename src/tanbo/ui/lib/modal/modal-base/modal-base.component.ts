import { Component, OnInit, OnDestroy, TemplateRef, Optional } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { transition, trigger, style, animate, keyframes } from '@angular/animations';
import { Subscription } from 'rxjs';

import { ModalController } from './modal-controller';

@Component({
  selector: 'ui-modal-base',
  templateUrl: './modal-base.component.html',
  animations: [
    trigger('modalAnimation', [
      transition(':enter', animate(160, keyframes([
        style({
          marginTop: -300,
          opacity: 0,
          offset: 0
        }),
        style({
          marginTop: 0,
          opacity: 1,
          offset: 1
        })
      ]))),
      transition(':leave', animate(100, style({
        transform: 'scale(.8) translateX(-50%) translateY(-50%)',
        opacity: .8
      })))
    ])
  ]
})
export class ModalBaseComponent implements OnDestroy, OnInit {
  templates: Array<TemplateRef<any>> = [];

  get isShow() {
    return this.templates.length > 0;
  }

  private subs: Subscription[] = [];

  constructor(private modalController: ModalController,
              @Optional() private router: Router) {
  }

  ngOnInit() {
    if (this.router) {
      this.subs.push(this.router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
          this.templates.length = 0;
        }
      }));
    }
    this.subs.push(this.modalController.template.subscribe(template => {
      this.templates.push(template);
    }));
    this.subs.push(this.modalController.onHide.subscribe(template => {
      if (template) {
        const index = this.templates.indexOf(template);
        if (index > -1) {
          this.templates.splice(index, 1);
        }
      } else {
        this.templates.pop();
      }
    }));
    this.subs.push(this.modalController.onHideAll.subscribe(() => {
      this.templates.length = 0;
    }));
  }

  ngOnDestroy() {
    this.subs.forEach(item => item.unsubscribe());
    this.templates = [];
  }
}