import { NgModule, ModuleWithProviders } from '@angular/core';

import { UIAppModule } from './app/app.module';
import { UIBreadcrumbModule } from './breadcrumb/breadcrumb.module';
import { UICropperModule } from './cropper/cropper.module';
import { UIDropdownModule } from './dropdown/dropdown.module';
import { UIFormsModule } from './forms/forms.module';
import { LoadingModule } from './loading/loading.module';
import { UIModalModule } from './modal/modal.module';
import { UINavModule } from './nav/nav.module';
import { UIOtherModule } from './other/other.module';
import { UIPanelModule } from './panel/panel.module';
import { UIScrollModule } from './scroll/scroll.module';
import { UIStepModule } from './step/step.module';
import { UITabModule } from './tab/tab.module';
import { UITableModule } from './table/table.module';
import { UITimelineModule } from './timeline/timeline.module';
import { UITreeModule } from './tree/tree.module';

import { UI_OVERLAY_Z_INDEX } from './base/help';

@NgModule({
  exports: [
    UIAppModule,
    UIBreadcrumbModule,
    UICropperModule,
    UIDropdownModule,
    UIFormsModule,
    LoadingModule,
    UIModalModule,
    UINavModule,
    UIOtherModule,
    UIPanelModule,
    UIScrollModule,
    UIStepModule,
    UITabModule,
    UITableModule,
    UITimelineModule,
    UITreeModule
  ]
})
export class UIModule {
  static forRoot(): ModuleWithProviders<UIModule> {
    return {
      ngModule: UIModule,
      providers: [{
          provide: UI_OVERLAY_Z_INDEX,
          useValue: 1000
        }
      ]
    };
  }
}
