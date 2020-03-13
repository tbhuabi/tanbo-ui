import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UIOtherModule } from '../other/other.module';
import { OverlayComponent } from './overlay/overlay.component';
import { DrawerComponent } from './drawer/drawer.component';

@NgModule({
  imports: [
    CommonModule,
    UIOtherModule
  ],
  declarations: [
    OverlayComponent,
    DrawerComponent
  ],
  exports: [
    OverlayComponent,
    DrawerComponent
  ]
})
export class UIBaseModule {
}
