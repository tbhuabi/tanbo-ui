import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  ]
})
export class UINavModule {
}