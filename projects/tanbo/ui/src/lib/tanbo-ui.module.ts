import { NgModule } from '@angular/core';

import { UIFormsModule } from './forms/forms.module';
import { UILayoutModule } from './layout/layout.module';
import { UIOtherModule } from './other/other.module';

@NgModule({
  exports: [
    UIFormsModule,
    UILayoutModule,
    UIOtherModule
  ]
})
export class UIModule {
}