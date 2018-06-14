import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewLoadingBarComponent } from './view-loading-bar/view-loading-bar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ViewLoadingBarComponent
  ],
  exports: [
    ViewLoadingBarComponent
  ]
})
export class UIOtherModule {
}