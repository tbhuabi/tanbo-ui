import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotifyComponent } from './notify/notify.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NotifyComponent
  ],
  exports: [
    NotifyComponent
  ]
})
export class UINotifyModule {
}
