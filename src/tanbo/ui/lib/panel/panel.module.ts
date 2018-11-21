import { NgModule } from '@angular/core';

import { PanelComponent } from './panel/panel.component';
import { PanelBodyComponent } from './panel-body/panel-body.component';
import { PanelFooterComponent } from './panel-footer/panel-footer.component';
import { PanelHeadingComponent } from './panel-heading/panel-heading.component';

@NgModule({
  declarations: [
    PanelComponent,
    PanelBodyComponent,
    PanelFooterComponent,
    PanelHeadingComponent
  ],
  exports: [
    PanelComponent,
    PanelBodyComponent,
    PanelFooterComponent,
    PanelHeadingComponent
  ]
})
export class UIPanelModule {
}