import { NgModule, ModuleWithProviders } from '@angular/core';

import { UIAppModule } from './app/app.module';
import { UIBreadcrumbModule } from './breadcrumb/breadcrumb.module';
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

import { DialogController } from './modal/dialog/dialog-controller';
import { ModalController } from './modal/modal-base/modal-controller';
import { NotifyController } from './modal/notify/notify-controller';
import { TooltipBaseService } from './other/tooltip-base/tooltip-base.service';
import { AnchorService } from './quick-nav/anchor/anchor.service';
import { UI_ANCHOR_LINK_DISTANCE } from './quick-nav/helper';

@NgModule({
  exports: [
    UIAppModule,
    UIBreadcrumbModule,
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
