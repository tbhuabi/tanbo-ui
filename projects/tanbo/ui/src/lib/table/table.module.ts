import { NgModule } from '@angular/core';

import { UIFormsModule } from '../forms/forms.module';

import { TableDirective } from './table.directive';
import { SelectableGroupComponent } from './selectable-group/selectable-group.component';
import { SelectableItemComponent } from './selectable-item/selectable-item.component';
import { TableResponsiveComponent } from './table-responsive/table-responsive.component';

@NgModule({
  imports: [
    UIFormsModule
  ],
  declarations: [
    TableDirective,
    SelectableGroupComponent,
    SelectableItemComponent,
    TableResponsiveComponent
  ],
  exports: [
    TableDirective,
    SelectableGroupComponent,
    SelectableItemComponent,
    TableResponsiveComponent
  ]
})
export class UITableModule {
}