import { Component, OnInit, OnDestroy, Optional, Input, SkipSelf, Inject } from '@angular/core';
import { Subscription } from 'rxjs';

import { TreeItemService } from '../tree-item/tree-item.service';
import { UI_TREE_DEPTH, UI_TREE_OFFSET } from '../help';

export function treeDepthFactory(depth: number) {
  return depth + 1;
}

@Component({
  selector: 'ui-tree',
  templateUrl: './tree.component.html',
  host: {
    '[class.ui-open]': 'open'
  },
  providers: [{
    provide: UI_TREE_DEPTH,
    useFactory: treeDepthFactory,
    deps: [[UI_TREE_DEPTH, new SkipSelf()]]
  }]
})
export class TreeComponent implements OnDestroy, OnInit {
  @Input()
  set open(value: boolean) {
    this.isWrite = true;
    this._open = value;
  }

  get open() {
    return this._open;
  }

  @Input()
  depth = 0;

  get left() {
    return (this.depth - 2) * 2 + 1 + this.offset + 'em';
  }

  private sub: Subscription;
  private _open = false;
  private isWrite = false;

  constructor(@Optional() private treeItemService: TreeItemService,
              @Inject(UI_TREE_DEPTH) depth: number,
              @Inject(UI_TREE_OFFSET) private offset: number) {
    this.depth = depth;
  }

  ngOnInit() {
    if (this.treeItemService) {
      this.sub = this.treeItemService.isOpen.subscribe(b => {
        this.open = b;
      });
    } else if (!this.isWrite) {
      this.open = true;
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}