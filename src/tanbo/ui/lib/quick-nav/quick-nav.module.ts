import { NgModule } from '@angular/core';

import { AnchorComponent } from './anchor/anchor.component';
import { AnchorLinkComponent } from './anchor-link/anchor-link.component';

@NgModule({
  declarations: [
    AnchorComponent,
    AnchorLinkComponent
  ],
  exports: [
    AnchorComponent,
    AnchorLinkComponent
  ]
})
export class UIQuickNavModule {
}