import { Component, ChangeDetectionStrategy } from '@angular/core';

import { TreeItemService } from './tree-item.service';

@Component({
  selector: 'ui-tree-item',
  templateUrl: './tree-item.component.html',
  providers: [
    TreeItemService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeItemComponent {
}