import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DividerComponent } from './divider/divider.component';
import { ViewLoadingBarComponent } from './view-loading-bar/view-loading-bar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DividerComponent,
    ViewLoadingBarComponent
  ],
  exports: [
    DividerComponent,
    ViewLoadingBarComponent
  ]
})
export class UIOtherModule {
}