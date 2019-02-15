import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavComponent } from './nav/nav.component';
import { NavInnerComponent } from './nav-inner/nav-inner.component';
import { NavItemComponent } from './nav-item/nav-item.component';
import { NavThumbnailComponent } from './nav-thumbnail/nav-thumbnail.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NavComponent,
    NavInnerComponent,
    NavItemComponent,
    NavThumbnailComponent
  ],
  exports: [
    NavComponent,
    NavInnerComponent,
    NavItemComponent,
    NavThumbnailComponent
  ]
})
export class UINavModule {
}