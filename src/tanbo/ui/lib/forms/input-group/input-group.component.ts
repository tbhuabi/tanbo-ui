import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-input-group',
  templateUrl: './input-group.component.html',
  host: {
    '[class.ui-input-group-lg]': 'size === "lg"',
    '[class.ui-input-group-sm]': 'size === "sm"'
  }
})
export class InputGroupComponent {
  @Input() size: string;
}