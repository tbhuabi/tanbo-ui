import { Component, OnInit, OnDestroy, Optional, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { TreeItemService } from '../tree-item/tree-item.service';

@Component({
  selector: 'ui-tree',
  templateUrl: './tree.component.html',
  host: {
    '[class.ui-open]': 'open'
  }
})
export class TreeComponent implements OnDestroy, OnInit {
  @Input()
  open: boolean = false;

  private sub: Subscription;

  constructor(@Optional() private treeItemService: TreeItemService) {
  }

  ngOnInit() {
    if (this.treeItemService) {
      this.sub = this.treeItemService.isOpen.subscribe(b => {
        this.open = b;
      });
    }

  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}