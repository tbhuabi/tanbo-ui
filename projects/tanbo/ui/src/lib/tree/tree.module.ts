import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UIFormsModule } from '../forms/forms.module';

import { UI_TREE_UNCHECKED_ICON, UI_TREE_CHECKED_ICON } from './config';

import { TreeComponent } from './tree/tree.component';
import { TreeContainerComponent } from './tree-container/tree-container.component';
import { TreeInnerComponent } from './tree-inner/tree-inner.component';
import { TreeItemComponent } from './tree-item/tree-item.component';
import { TreeSelectorComponent } from './tree-selector/tree-selector.component';

@NgModule({
  imports: [
    UIFormsModule,
    CommonModule
  ],
  declarations: [
    TreeComponent,
    TreeContainerComponent,
    TreeInnerComponent,
    TreeItemComponent,
    TreeSelectorComponent
  ],
  exports: [
    TreeComponent,
    TreeContainerComponent,
    TreeInnerComponent,
    TreeItemComponent,
    TreeSelectorComponent
  ],
  providers: [{
    provide: UI_TREE_CHECKED_ICON,
    useValue: 'ui-icon-checkbox-checked'
  }, {
    provide: UI_TREE_UNCHECKED_ICON,
    useValue: 'ui-icon-checkbox-unchecked'
  }]
})
export class UITreeModule {
}