import { Component, OnInit, OnDestroy, Optional, Input, SkipSelf, Inject } from '@angular/core';
import { Subscription } from 'rxjs';

import { TreeItemService } from '../tree-item/tree-item.service';
import { UI_TREE_DEPTH, UI_TREE_OFFSET } from '../config';

@Component({
  selector: 'ui-tree',
  templateUrl: './tree.component.html',
  host: {
    '[class.ui-open]': 'open'
  },
  providers: [{
    provide: UI_TREE_DEPTH,
    useFactory(depth: number) {
      return depth + 1;
    },
    deps: [[UI_TREE_DEPTH, new SkipSelf()]]
  }]
})
export class TreeComponent implements OnDestroy, OnInit {
  @Input()
  open: boolean = false;

  get left() {
    return (this.depth - 2) * 2 + this.offset + 'em';
  }

  private sub: Subscription;

  constructor(@Optional() private treeItemService: TreeItemService,
              @Inject(UI_TREE_DEPTH) public depth: number,
              @Inject(UI_TREE_OFFSET) private offset: number) {
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