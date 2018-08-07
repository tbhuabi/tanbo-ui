import { Component, ChangeDetectionStrategy } from '@angular/core';

import { NavItemService } from './nav-item.service';

@Component({
  selector: 'ui-nav-item',
  templateUrl: './nav-item.component.html',
  providers: [
    NavItemService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavItemComponent {
}