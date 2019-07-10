import { Component, Input, Optional, Inject } from '@angular/core';

import { TreeItemService } from '../tree-item/tree-item.service';
import { UI_TREE_UNCHECKED_ICON, UI_TREE_CHECKED_ICON } from '../help';

@Component({
  selector: 'ui-tree-expand',
  templateUrl: './tree-expand.component.html'
})
export class TreeExpandComponent {
  @Input() checkedIcon: string;
  @Input() uncheckedIcon: string;

  @Input()
  set checked(v: boolean) {
    this._checked = v;
    if (this.treeItemService) {
      this.treeItemService.changeExpand(v);
    }
  }

  get checked() {
    return this._checked;
  }

  private _checked = false;

  constructor(@Optional() private treeItemService: TreeItemService,
              @Inject(UI_TREE_CHECKED_ICON) _checkedIcon: string,
              @Inject(UI_TREE_UNCHECKED_ICON) _uncheckedIcon: string) {
    this.checkedIcon = _checkedIcon;
    this.uncheckedIcon = _uncheckedIcon;
  }

  change(b: boolean) {
    this.checked = b;
  }
}
