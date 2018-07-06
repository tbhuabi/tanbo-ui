import { NgModule, ModuleWithProviders } from '@angular/core';

import { UIAppModule } from './app/app.module';
import { UIFormsModule } from './forms/forms.module';
import { UILayoutModule } from './layout/layout.module';
import { UIModalModule } from './modal/modal.module';
import { UINavModule } from './nav/nav.module';
import { UIOtherModule } from './other/other.module';
import { UITableModule } from './table/table.module';
import { UITimelineModule } from './timeline/timeline.module';
import { UITreeModule } from './tree/tree.module';

import { DialogController, ModalController, NotifyController } from './modal/config';
import { TooltipBaseService } from './other/config';

@NgModule({
  exports: [
    UIAppModule,
    UIFormsModule,
    UILayoutModule,
    UINavModule,
    UIModalModule,
    UIOtherModule,
    UITableModule,
    UITimelineModule,
    UITreeModule
  ]
})
export class UIModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UIModule,
      providers: [
        DialogController,
        ModalController,
        NotifyController,
        TooltipBaseService
      ]
    };
  }
}