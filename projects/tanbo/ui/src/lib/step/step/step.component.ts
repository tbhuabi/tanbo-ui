import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  OnDestroy,
  Input
} from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { StepItemComponent } from '../step-item/step-item.component';

@Component({
  selector: 'ui-step',
  templateUrl: './step.component.html'
})
export class StepComponent implements AfterContentInit, OnDestroy {
  @ContentChildren(StepItemComponent) items: QueryList<StepItemComponent>;

  @Input()
  get activeIndex() {
    return this._activeIndex;
  }

  set activeIndex(num: number) {
    this._activeIndex = num;
    this.updateChildren(num);
  }

  private _activeIndex: number = 0;
  private subscription: Subscription;

  ngAfterContentInit() {
    this.initChildren();
    this.updateChildren(this._activeIndex);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  initChildren() {
    this.subscription = this.items.changes.pipe(delay(0)).subscribe(() => {
      this.updateChildren(this._activeIndex);
    });
  }

  updateChildren(num: number) {
    if (this.items) {
      this.items.forEach((item: StepItemComponent, index: number) => {
        item.isSuccess = num > index;
        item.isWaiting = num < index;

        item.index = index + 1;
        if (index + 1 === this.items.length) {
          item.maxWidth = `${100 / this.items.length}%`;
        }
      });
    }
  }
}