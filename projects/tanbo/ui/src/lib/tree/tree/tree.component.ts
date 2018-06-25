import { Component, OnInit, OnDestroy, Optional, Input, SkipSelf, Inject, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

import { TreeItemService } from '../tree-item/tree-item.service';
import { UI_TREE_DEPTH, UI_TREE_OFFSET } from '../config';

export interface TreeData extends Object {
  children?: TreeData[]
}

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
  @Input()
  data: Array<TreeData> = [];
  @Input()
  itemType = ''; // 可选link, label
  @Input()
  keyForText = 'text';
  @Input()
  openAll = false;

  @Output()
  uiItemCheck = new EventEmitter<TreeData>();

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

  checked(ev: TreeData) {
    this.uiItemCheck.emit(ev);
  }
}