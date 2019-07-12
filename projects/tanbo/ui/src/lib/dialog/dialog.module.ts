import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UIBaseModule } from '../base/base.module';

import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  imports: [
    CommonModule,
    UIBaseModule
  ],
  declarations: [
    DialogComponent
  ],
  exports: [
    DialogComponent
  ]
})
export class UIDialogModule {
}
