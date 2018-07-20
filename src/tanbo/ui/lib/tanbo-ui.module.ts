import { NgModule, ModuleWithProviders } from '@angular/core';

import { UIAppModule } from './app/app.module';
import { UIFormsModule } from './forms/forms.module';
import { UILayoutModule } from './layout/layout.module';
import { UIModalModule } from './modal/modal.module';
import { UINavModule } from './nav/nav.module';
import { UIOtherModule } from './other/other.module';
import { UIQuickNavModule } from './quick-nav/quick-nav.module';
import { UIStepModule } from './step/step.module';
import { UITableModule } from './table/table.module';
import { UITimelineModule } from './timeline/timeline.module';
import { UITreeModule } from './tree/tree.module';

import { DialogController, ModalController, NotifyController } from './modal/index';
import { TooltipBaseService } from './other/index';
import { AnchorService } from './quick-nav/index';

@NgModule({
  exports: [
    UIAppModule,
    UIFormsModule,
    UILayoutModule,
    UINavModule,
    UIModalModule,
    UIOtherModule,
    UIQuickNavModule,
    UIStepModule,
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
        TooltipBaseService,
        AnchorService
      ]
    };
  }
}