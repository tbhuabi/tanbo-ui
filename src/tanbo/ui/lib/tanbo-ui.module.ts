import { NgModule, ModuleWithProviders } from '@angular/core';

import { UIAppModule } from './app/app.module';
import { UICropperModule } from './cropper/cropper.module';
import { UIDropdownModule } from './dropdown/dropdown.module';
import { UIFormsModule } from './forms/forms.module';
import { UIModalModule } from './modal/modal.module';
import { UINavModule } from './nav/nav.module';
import { UIOtherModule } from './other/other.module';
import { UIPanelModule } from './panel/panel.module';
import { UIQuickNavModule } from './quick-nav/quick-nav.module';
import { UIStepModule } from './step/step.module';
import { UITabModule } from './tab/tab.module';
import { UITableModule } from './table/table.module';
import { UITimelineModule } from './timeline/timeline.module';
import { UITreeModule } from './tree/tree.module';

import { DialogController, ModalController, NotifyController } from './modal/index';
import { TooltipBaseService } from './other/index';
import { AnchorService, UI_ANCHOR_LINK_DISTANCE } from './quick-nav/index';

@NgModule({
  exports: [
    UIAppModule,
    UICropperModule,
    UIDropdownModule,
    UIFormsModule,
    UIModalModule,
    UINavModule,
    UIOtherModule,
    UIPanelModule,
    UIQuickNavModule,
    UIStepModule,
    UITabModule,
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
        AnchorService, {
          provide: UI_ANCHOR_LINK_DISTANCE,
          useValue: 0
        }
      ]
    };
  }
}