import { Component, OnInit, OnDestroy, Optional, Input, SkipSelf, Inject } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';

import { TreeItemService } from '../tree-item/tree-item.service';
import { UI_TREE_DEPTH, UI_TREE_OFFSET } from '../help';
import { attrToNumber } from '../../utils';

export function treeDepthFactory(depth: number) {
  return depth + 1;
}

@Component({
  selector: 'ui-tree',
  templateUrl: './tree.component.html',
  providers: [{
    provide: UI_TREE_DEPTH,
    useFactory: treeDepthFactory,
    deps: [[UI_TREE_DEPTH, new SkipSelf()]]
  }],
  host: {
    '[@treeAnimation]': 'expand ? "open" : "close"'
  },
  animations: [
    trigger('treeAnimation', [
        state('open', style({
          height: '*',
          opacity: 1,
          overflow: 'visible'
        })),
        state('close', style({
          height: 0,
          opacity: 0.5,
          overflow: 'hidden'
        })),
        transition('open <=> close', animate(150)),
        transition(':enter', [
          style({
            height: 0,
            opacity: 0.5,
            overflow: 'hidden'
          }),
          animate(150, style({
              height: '*',
              opacity: 1,
              overflow: 'visible'
            })
          )
        ]),
        transition(':leave', [
          animate(150, style({
              height: '*',
              opacity: 1,
              overflow: 'visible'
            })
          )
        ])
      ]
    )]
})
export class TreeComponent implements OnDestroy, OnInit {
  @Input()
  set depth(v: number) {
    this._depth = attrToNumber(v);
  }

  get depth() {
    return this._depth;
  }

  @Input()
  set expand(value: boolean) {
    this.isWrite = true;
    this._expand = value;
  }

  get expand() {
    return this._expand;
  }

  get left() {
    return (this.depth - 2) * 2 + 1 + this.offset + 'em';
  }

  private sub: Subscription;
  private _depth = 0;
  private _expand = false;
  private isWrite = false;

  constructor(@Optional() private treeItemService: TreeItemService,
              @Inject(UI_TREE_DEPTH) depth: number,
              @Inject(UI_TREE_OFFSET) private offset: number) {
    this.depth = depth;
  }

  ngOnInit() {
    if (this.treeItemService) {
      this.sub = this.treeItemService.expand.subscribe(b => {
        this.expand = b;
      });
    } else if (!this.isWrite) {
      this.expand = true;
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
