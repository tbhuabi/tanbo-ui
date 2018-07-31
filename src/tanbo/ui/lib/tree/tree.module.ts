import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UIFormsModule } from '../forms/forms.module';

import { UI_TREE_UNCHECKED_ICON, UI_TREE_CHECKED_ICON, UI_TREE_DEPTH, UI_TREE_OFFSET } from './help';

import { TreeComponent } from './tree/tree.component';
import { TreeInnerComponent } from './tree-inner/tree-inner.component';
import { TreeItemComponent } from './tree-item/tree-item.component';
import { TreeExpandComponent } from './tree-expand/tree-expand.component';

@NgModule({
  imports: [
    UIFormsModule,
    CommonModule
  ],
  declarations: [
    TreeComponent,
    TreeInnerComponent,
    TreeItemComponent,
    TreeExpandComponent
  ],
  exports: [
    TreeComponent,
    TreeInnerComponent,
    TreeItemComponent,
    TreeExpandComponent
  ],
  providers: [{
    provide: UI_TREE_CHECKED_ICON,
    useValue: 'ui-icon-arrow2-bottom'
  }, {
    provide: UI_TREE_UNCHECKED_ICON,
    useValue: 'ui-icon-arrow2-right'
  }, {
    provide: UI_TREE_DEPTH,
    useValue: -1
  }, {
    provide: UI_TREE_OFFSET,
    useValue: 0
  }]
})
export class UITreeModule {
}