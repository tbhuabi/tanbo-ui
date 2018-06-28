import { NgModule, ModuleWithProviders } from '@angular/core';

import { UIAppModule } from './app/app.module';
import { UIFormsModule } from './forms/forms.module';
import { UILayoutModule } from './layout/layout.module';
import { UIMenuModule } from './menu/menu.module';
import { UIModalModule } from './modal/modal.module';
import { UIOtherModule } from './other/other.module';
import { UITableModule } from './table/table.module';
import { UITreeModule } from './tree/tree.module';

import { DialogController, ModalController } from './modal/config';

@NgModule({
  exports: [
    UIAppModule,
    UIFormsModule,
    UILayoutModule,
    UIMenuModule,
    UIModalModule,
    UIOtherModule,
    UITableModule,
    UITreeModule
  ]
})
export class UIModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UIModule,
      providers: [
        DialogController,
        ModalController
      ]
    };
  }
}