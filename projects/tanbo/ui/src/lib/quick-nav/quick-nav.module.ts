import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AnchorComponent } from './anchor/anchor.component';
import { AnchorLinkComponent } from './anchor-link/anchor-link.component';

@NgModule({
  imports: [
    RouterModule
  ],
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