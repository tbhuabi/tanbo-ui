import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UI_MENU_DEPTH, UI_MENU_OFFSET } from './config';

import { MenuComponent } from './menu/menu.component';
import { MenuInnerComponent } from './menu-inner/menu-inner.component';
import { MenuItemComponent } from './menu-item/menu-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MenuComponent,
    MenuInnerComponent,
    MenuItemComponent
  ],
  exports: [
    MenuComponent,
    MenuInnerComponent,
    MenuItemComponent
  ],
  providers: [{
    provide: UI_MENU_DEPTH,
    useValue: -1
  }, {
    provide: UI_MENU_OFFSET,
    useValue: 1
  }]
})
export class UIMenuModule {
}