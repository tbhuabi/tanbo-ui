import { NgModule } from '@angular/core';

import { PanelComponent } from './panel/panel.component';
import { PanelBodyComponent } from './panel-body/panel-body.component';
import { PanelFooterComponent } from './panel-footer/panel-footer.component';
import { PanelHeaderComponent } from './panel-header/panel-header.component';

@NgModule({
  declarations: [
    PanelComponent,
    PanelBodyComponent,
    PanelFooterComponent,
    PanelHeaderComponent
  ],
  exports: [
    PanelComponent,
    PanelBodyComponent,
    PanelFooterComponent,
    PanelHeaderComponent
  ]
})
export class UIPanelModule {
}