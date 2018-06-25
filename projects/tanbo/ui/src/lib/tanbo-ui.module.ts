import { NgModule } from '@angular/core';

import { UIFormsModule } from './forms/forms.module';
import { UILayoutModule } from './layout/layout.module';
import { UIOtherModule } from './other/other.module';
import { UITableModule } from './table/table.module';
import { UITreeModule } from './tree/tree.module';

@NgModule({
  exports: [
    UIFormsModule,
    UILayoutModule,
    UIOtherModule,
    UITableModule,
    UITreeModule
  ]
})
export class UIModule {
}