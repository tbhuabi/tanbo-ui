import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogComponent } from './dialog/dialog.component';
import { MaskComponent } from './mask/mask.component';
import { ModalComponent } from './modal/modal.component';
import { ModalBaseComponent } from './modal-base/modal-base.component';
import { ModalFooterComponent } from './modal-footer/modal-footer.component';
import { ModalHeaderComponent } from './modal-header/modal-header.component';
import { ModalInnerComponent } from './modal-inner/modal-inner.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DialogComponent,
    MaskComponent,
    ModalComponent,
    ModalBaseComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    ModalInnerComponent
  ],
  exports: [
    DialogComponent,
    MaskComponent,
    ModalComponent,
    ModalBaseComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    ModalInnerComponent
  ]
})
export class UIModalModule {
}