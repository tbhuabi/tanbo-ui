import { Component, ContentChildren, QueryList, OnInit, AfterContentInit, Input } from '@angular/core';

import { StepItemComponent } from '../step-item/step-item.component';

@Component({
  selector: 'ui-step',
  templateUrl: './step.component.html'
})
export class StepComponent implements OnInit, AfterContentInit {
  @ContentChildren(StepItemComponent) items: QueryList<StepItemComponent>;

  @Input()
  get active() {
    return this._active;
  }

  set active(num: number) {
    this._active = num;
    this.updateChildren(num);
  }

  private _active: number = 0;

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.initChildren();
    this.updateChildren(this._active);
  }

  initChildren() {
    this.items.forEach((item: StepItemComponent, index: number) => {
      item.index = index + 1;
      if (index + 1 === this.items.length) {
        item.isLast = true;
        item.maxWidth = `${100 / this.items.length}%`;
      }
    });
  }

  updateChildren(num: number) {
    if (this.items) {
      this.items.forEach((item: StepItemComponent, index: number) => {
        item.isSuccess = num > index;
      });
    }
  }

}