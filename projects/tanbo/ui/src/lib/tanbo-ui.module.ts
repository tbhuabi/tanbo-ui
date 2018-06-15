import { NgModule } from '@angular/core';

import { UIFormsModule } from './forms/forms.module';
import { UILayoutModule } from './layout/layout.module';
import { UIOtherModule } from './other/other.module';
import { UITreeModule } from './tree/tree.module';

@NgModule({
  exports: [
    UIFormsModule,
    UILayoutModule,
    UIOtherModule,
    UITreeModule
  ]
})
export class UIModule {
}