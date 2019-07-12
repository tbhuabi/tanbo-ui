import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaskComponent } from './mask/mask.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MaskComponent
  ],
  exports: [
    MaskComponent
  ]
})
export class UIBaseModule {
}
