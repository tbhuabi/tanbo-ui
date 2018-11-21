import { NgModule, ModuleWithProviders } from '@angular/core';

import { UIAppModule } from './app/app.module';
import { UIFormsModule } from './forms/forms.module';
import { UILayoutModule } from './layout/layout.module';
import { UIModalModule } from './modal/modal.module';
import { UINavModule } from './nav/nav.module';
import { UIOtherModule } from './other/other.module';
import { UIPanelModule } from './panel/panel.module';
import { UIQuickNavModule } from './quick-nav/quick-nav.module';
import { UIStepModule } from './step/step.module';
import { UITableModule } from './table/table.module';
import { UITimelineModule } from './timeline/timeline.module';
import { UITreeModule } from './tree/tree.module';
import { UICropperModule } from './cropper/cropper.module';

import { DialogController, ModalController, NotifyController } from './modal/index';
import { TooltipBaseService } from './other/index';
import { AnchorService, UI_ANCHOR_LINK_DISTANCE } from './quick-nav/index';

@NgModule({
  exports: [
    UIAppModule,
    UIFormsModule,
    UILayoutModule,
    UINavModule,
    UIModalModule,
    UIOtherModule,
    UIPanelModule,
    UIQuickNavModule,
    UIStepModule,
    UITableModule,
    UITimelineModule,
    UITreeModule,
    UICropperModule
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
        AnchorService, {
          provide: UI_ANCHOR_LINK_DISTANCE,
          useValue: 0
        }
      ]
    };
  }
}