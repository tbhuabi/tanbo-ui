import { Component } from '@angular/core';

import { MenuItemService } from './menu-item.service';

@Component({
  selector: 'ui-menu-item',
  templateUrl: './menu-item.component.html',
  providers: [
    MenuItemService
  ]
})
export class MenuItemComponent {
}