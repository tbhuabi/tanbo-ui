import { NgModule } from '@angular/core';

import { UIFormsModule } from '../forms/forms.module';

import { TableDirective } from './table.directive';
import { SelectableGroupComponent } from './selectable-group/selectable-group.component';
import { SelectableItemComponent } from './selectable-item/selectable-item.component';

@NgModule({
  imports: [
    UIFormsModule
  ],
  declarations: [
    TableDirective,
    SelectableGroupComponent,
    SelectableItemComponent
  ],
  exports: [
    TableDirective,
    SelectableGroupComponent,
    SelectableItemComponent
  ]
})
export class UITableModule {
}