import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UI_NAV_DEPTH, UI_NAV_OFFSET } from './help';

import { NavComponent } from './nav/nav.component';
import { NavInnerComponent } from './nav-inner/nav-inner.component';
import { NavItemComponent } from './nav-item/nav-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NavComponent,
    NavInnerComponent,
    NavItemComponent
  ],
  exports: [
    NavComponent,
    NavInnerComponent,
    NavItemComponent
  ],
  providers: [{
    provide: UI_NAV_DEPTH,
    useValue: -1
  }, {
    provide: UI_NAV_OFFSET,
    useValue: 1
  }]
})
export class UINavModule {
}