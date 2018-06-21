import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DividerComponent } from './divider/divider.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { ViewLoadingBarComponent } from './view-loading-bar/view-loading-bar.component';

import { TooltipDirective } from './tooltip/tooltip.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DividerComponent,
    TooltipComponent,
    ViewLoadingBarComponent,
    TooltipDirective
  ],
  exports: [
    DividerComponent,
    ViewLoadingBarComponent,
    TooltipDirective
  ],
  entryComponents: [
    TooltipComponent
  ]
})
export class UIOtherModule {
}