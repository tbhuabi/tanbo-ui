import { NgModule } from '@angular/core';

import { AnchorComponent } from './anchor/anchor.component';
import { AnchorLinkComponent } from './anchor-link/anchor-link.component';
import { AnchorLinkGroupComponent } from './anchor-link-group/anchor-link-group.component';

@NgModule({
  declarations: [
    AnchorComponent,
    AnchorLinkComponent,
    AnchorLinkGroupComponent
  ],
  exports: [
    AnchorComponent,
    AnchorLinkComponent,
    AnchorLinkGroupComponent
  ]
})
export class UIQuickNavModule {
}