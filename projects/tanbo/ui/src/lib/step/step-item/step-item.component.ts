import { Component, HostBinding } from '@angular/core';

export enum StepStatus {
  waiting,
  complete,
  current
}

@Component({
  selector: 'ui-step-item',
  templateUrl: './step-item.component.html'
})
export class StepItemComponent {
  index = 0;
  status: StepStatus = StepStatus.waiting;

  @HostBinding('class.ui-complete')
  get isComplete() {
    return this.status === StepStatus.complete;
  }

  @HostBinding('class.ui-waiting')
  get isWaiting() {
    return this.status === StepStatus.waiting;
  }

  @HostBinding('class.ui-current')
  get isCurrent() {
    return this.status === StepStatus.current;
  }
}
