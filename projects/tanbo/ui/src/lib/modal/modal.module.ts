import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UIBaseModule } from '../base/base.module';

import { ModalComponent } from './modal/modal.component';
import { ModalBaseComponent } from './modal-base/modal-base.component';
import { ModalBodyComponent } from './modal-body/modal-body.component';
import { ModalFooterComponent } from './modal-footer/modal-footer.component';
import { ModalHeaderComponent } from './modal-header/modal-header.component';

@NgModule({
  imports: [
    CommonModule,
    UIBaseModule
  ],
  declarations: [
    ModalComponent,
    ModalBaseComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ModalHeaderComponent
  ],
  exports: [
    ModalComponent,
    ModalBaseComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ModalHeaderComponent
  ]
})
export class UIModalModule {
}
