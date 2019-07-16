import { Component, Inject, HostBinding, Input } from '@angular/core';

import { UI_TREE_DEPTH, UI_TREE_OFFSET } from '../help';

@Component({
  selector: 'ui-tree-inner',
  templateUrl: './tree-inner.component.html'
})
export class TreeInnerComponent {
  @Input() depth = 0;
  @HostBinding('style.paddingLeft')
  get paddingLeft() {
    return this.depth * 2 + 2 + this.offset + 'em';
  }

  get left() {
    return (this.depth - 1) * 2 + 1 + this.offset + 'em';
  }

  constructor(@Inject(UI_TREE_DEPTH) depth: number,
              @Inject(UI_TREE_OFFSET) private offset: number) {
    this.depth = depth;
  }
}
