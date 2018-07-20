import { Component, QueryList, ContentChildren, AfterContentInit, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';

import { StepItemComponent } from '../step-item/step-item.component';

@Component({
  selector: 'ui-step',
  templateUrl: './step.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: StepItemComponent,
    multi: true
  }]
})
export class StepComponent implements ControlValueAccessor, OnDestroy, AfterContentInit {
  @ContentChildren(StepItemComponent)
  timelineItems: QueryList<StepItemComponent>;

  private value: string = '';
  private onChange: (_: any) => any;
  private onTouched: (_: any) => any;

  private sub: Subscription;
  private currentIndex = -1;

  ngAfterContentInit() {
    console.log(this.timelineItems);
    this.sub = this.timelineItems.changes.subscribe(item => {
      console.log(item);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  previous() {

  }

  next() {

  }

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  private updateChildrenStateByValue(value: any) {
    if (this.timelineItems) {
      this.timelineItems.forEach((item, index) => {
        if (item.value === value) {
          this.currentIndex = index;
        }
      });
    }
  }

  private updateChildrenStateByIndex() {
    if (this.currentIndex !== -1 && this.timelineItems) {
      this.timelineItems.forEach((item, index) => {
        if(index <= this.currentIndex){

        }
      });
    }
  }
}