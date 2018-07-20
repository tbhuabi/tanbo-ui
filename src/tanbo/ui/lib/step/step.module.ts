import { NgModule } from '@angular/core';

import { StepComponent } from './step/step.component';
import { StepItemComponent } from './step-item/step-item.component';

@NgModule({
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