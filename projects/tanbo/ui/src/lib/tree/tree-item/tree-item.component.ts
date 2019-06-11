import { Component } from '@angular/core';

import { TreeItemService } from './tree-item.service';

@Component({
  selector: 'ui-tree-item',
  templateUrl: './tree-item.component.html',
  providers: [
    TreeItemService
  ]
})
export class TreeItemComponent {
}