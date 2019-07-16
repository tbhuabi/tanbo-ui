import { Component, Inject, HostBinding, Input } from '@angular/core';

import { UI_TREE_DEPTH, UI_TREE_OFFSET } from '../help';
import { attrToNumber } from '../../utils';

@Component({
  selector: 'ui-tree-inner',
  templateUrl: './tree-inner.component.html'
})
export class TreeInnerComponent {
  @Input()
  set depth(v: number) {
    this._depth = attrToNumber(v);
  }

  get depth() {
    return this._depth;
  }
  @HostBinding('style.paddingLeft')
  get paddingLeft() {
    return this.depth * 2 + 2 + this.offset + 'em';
  }

  get left() {
    return (this.depth - 1) * 2 + 1 + this.offset + 'em';
  }

  private _depth = 0;

  constructor(@Inject(UI_TREE_DEPTH) depth: number,
              @Inject(UI_TREE_OFFSET) private offset: number) {
    this.depth = depth;
  }
}
