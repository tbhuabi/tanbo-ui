import { Component, Input, Optional, Inject } from '@angular/core';

import { TreeItemService } from '../tree-item/tree-item.service';
import { UI_TREE_UNCHECKED_ICON, UI_TREE_CHECKED_ICON } from '../config';

@Component({
  selector: 'ui-tree-expand',
  templateUrl: './tree-expand.component.html'
})
export class TreeExpandComponent {
  @Input()
  type: string = 'checkbox';
  @Input()
  checkedIcon = 'ui-icon-checkbox-checked';
  @Input()
  uncheckedIcon = 'ui-icon-checkbox-unchecked';
  @Input()
  checked: boolean = false;

  constructor(@Optional() private treeItemService: TreeItemService,
              @Inject(UI_TREE_CHECKED_ICON) _checkedIcon: string,
              @Inject(UI_TREE_UNCHECKED_ICON) _uncheckedIcon: string) {
    this.checkedIcon = _checkedIcon;
    this.uncheckedIcon = _uncheckedIcon;
  }

  change(b: boolean) {
    this.checked = b;
    if (this.treeItemService) {
      this.treeItemService.change(b);
    }
  }
}
