import { AfterContentInit, Component, ContentChildren, Input, OnDestroy, QueryList } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { StepItemComponent, StepStatus } from '../step-item/step-item.component';
import { attrToNumber } from '../../utils';

@Component({
  selector: 'ui-step',
  templateUrl: './step.component.html'
})
export class StepComponent implements AfterContentInit, OnDestroy {
  @ContentChildren(StepItemComponent) items: QueryList<StepItemComponent>;

  @Input()
  set activeIndex(num: number) {
    this._activeIndex = attrToNumber(num);
    this.updateChildren(num);
  }

  get activeIndex() {
    return this._activeIndex;
  }

  private _activeIndex = 0;
  private subscription: Subscription;

  ngAfterContentInit() {
    this.initChildren();
    this.updateChildren(this.activeIndex);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  initChildren() {
    this.subscription = this.items.changes.pipe(delay(0)).subscribe(() => {
      this.updateChildren(this.activeIndex);
    });
  }

  updateChildren(num: number) {
    if (this.items) {
      this.items.forEach((item: StepItemComponent, index: number) => {
        if (num > index) {
          item.status = StepStatus.complete;
        } else if (num < index) {
          item.status = StepStatus.waiting;
        } else {
          item.status = StepStatus.current;
        }
        item.index = index;
      });
    }
  }
}
