import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScrollComponent } from './scroll/scroll.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ScrollComponent
  ],
  exports: [
    ScrollComponent
  ]
})
export class UIScrollModule {
}
