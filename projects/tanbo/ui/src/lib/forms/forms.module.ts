import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { InputDirective } from './input/input.directive';
import { InputGroupComponent } from './input-group/input-group.component';

@NgModule({
  imports: [
    FormsModule
  ],
  declarations: [
    InputDirective,
    InputGroupComponent
  ],
  exports: [
    InputDirective,
    InputGroupComponent
  ]
})
export class UIFormsModule {
}