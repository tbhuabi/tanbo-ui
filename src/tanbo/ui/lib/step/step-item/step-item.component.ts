import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-step-item',
  templateUrl: './step-item.component.html'
})
export class StepItemComponent {
  @Input()
  value: any;

  @Input()
  checked: boolean;
}