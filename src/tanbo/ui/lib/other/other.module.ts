import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DividerComponent } from './divider/divider.component';
import { ItemComponent } from './item/item.component';
import { PopConfirmComponent } from './pop-confirm/pop-confirm.component';
import { TagComponent } from './tag/tag.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { ViewLoadingBarComponent } from './view-loading-bar/view-loading-bar.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { TooltipBaseComponent } from './tooltip-base/tooltip-base.component';

import { PopConfirmDirective } from './pop-confirm/pop-confirm.directive';
import { TooltipDirective } from './tooltip/tooltip.directive';
import { StopPropagationDirective } from './stop-propagation.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DividerComponent,
    ItemComponent,
    PopConfirmComponent,
    TagComponent,
    ToolBarComponent,
    ViewLoadingBarComponent,
    TooltipComponent,
    TooltipBaseComponent,

    PopConfirmDirective,
    TooltipDirective,
    StopPropagationDirective
  ],
  exports: [
    DividerComponent,
    ItemComponent,
    PopConfirmComponent,
    TagComponent,
    ToolBarComponent,
    ViewLoadingBarComponent,
    TooltipComponent,
    TooltipBaseComponent,

    PopConfirmDirective,
    TooltipDirective,
    StopPropagationDirective
  ],
  entryComponents: [
    TooltipComponent,
    PopConfirmComponent
  ]
})
export class UIOtherModule {
}