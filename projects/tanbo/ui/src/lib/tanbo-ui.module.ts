import { NgModule } from '@angular/core';

import { UIFormsModule } from './forms/forms.module';
import { UILayoutModule } from './layout/layout.module';

@NgModule({
  exports: [
    UIFormsModule,
    UILayoutModule
  ]
})
export class UIModule {
}