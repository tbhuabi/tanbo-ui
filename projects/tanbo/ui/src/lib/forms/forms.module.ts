import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { InputComponent } from './input/input.component';

@NgModule({
  imports: [
    FormsModule
  ],
  declarations: [
    InputComponent
  ],
  exports: [
    InputComponent
  ]
})
export class UIFormsModule {
}