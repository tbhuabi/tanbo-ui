import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-btn-group',
  templateUrl: './btn-group.component.html',
  host: {
    '[class.ui-btn-group-lg]': 'size === "lg"',
    '[class.ui-btn-group-sm]': 'size === "sm"'
  }
})
export class BtnGroupComponent {
  @Input()
  size: string;
}