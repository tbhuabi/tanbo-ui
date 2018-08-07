import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ui-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  host: {
    '[class.ui-top-left]': 'position === "topLeft"',
    '[class.ui-top-right]': 'position === "topRight"',
    '[class.ui-bottom-left]': 'position === "bottomLeft"',
    '[class.ui-bottom-right]': 'position === "bottomRight"'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownMenuComponent {
  @Input()
  position = 'bottomLeft';
}