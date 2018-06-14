import { Component, Input } from '@angular/core';

import { InputGroupService } from './input-group.service';

@Component({
  selector: 'ui-input-group',
  templateUrl: './input-group.component.html',
  providers: [
    InputGroupService
  ],
  host: {
    '[class.ui-input-group-lg]': 'size === "lg"',
    '[class.ui-input-group-sm]': 'size === "sm"'
  }
})
export class InputGroupComponent {
  @Input()
  size: string;
}