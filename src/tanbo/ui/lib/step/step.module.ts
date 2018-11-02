import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StepComponent } from './step/step.component';
import { StepItemComponent } from './step-item/step-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    StepComponent,
    StepItemComponent
  ],
  exports: [
    StepComponent,
    StepItemComponent
  ]
})
export class UIStepModule {

}