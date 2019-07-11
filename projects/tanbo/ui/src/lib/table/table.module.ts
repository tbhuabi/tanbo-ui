import { NgModule } from '@angular/core';

import { UIFormsModule } from '../forms/forms.module';

import { TableDirective } from './table.directive';
import { TableAllSelectorComponent } from './table-all-selector/table-all-selector.component';
import { TableSelectableItemComponent } from './table-selectable-item/table-selectable-item.component';
import { TableResponsiveComponent } from './table-responsive/table-responsive.component';

@NgModule({
  imports: [
    UIFormsModule
  ],
  declarations: [
    TableDirective,
    TableAllSelectorComponent,
    TableSelectableItemComponent,
    TableResponsiveComponent
  ],
  exports: [
    TableDirective,
    TableAllSelectorComponent,
    TableSelectableItemComponent,
    TableResponsiveComponent
  ]
})
export class UITableModule {
}
