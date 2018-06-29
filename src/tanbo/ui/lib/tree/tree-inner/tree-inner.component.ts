import { Component, Inject, HostBinding } from '@angular/core';

import { UI_TREE_DEPTH, UI_TREE_OFFSET } from '../config';

@Component({
  selector: 'ui-tree-inner',
  templateUrl: './tree-inner.component.html'
})
export class TreeInnerComponent {
  @HostBinding('style.paddingLeft')
  get paddingLeft() {
    return this.depth * 2 + 0.5 + this.offset + 'em';
  }

  get left() {
    return (this.depth - 1) * 2 + this.offset + 'em';
  }

  constructor(@Inject(UI_TREE_DEPTH) public depth: number,
              @Inject(UI_TREE_OFFSET) private offset: number) {
  }
}