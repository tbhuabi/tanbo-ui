import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AnchorComponent } from './anchor/anchor.component';
import { AnchorLinkComponent } from './anchor-link/anchor-link.component';

import { UI_ANCHOR_LINK_DISTANCE } from './helper';

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
  ],
  providers: [{
    provide: UI_ANCHOR_LINK_DISTANCE,
    useValue: 0
  }]
})
export class UIQuickNavModule {
}