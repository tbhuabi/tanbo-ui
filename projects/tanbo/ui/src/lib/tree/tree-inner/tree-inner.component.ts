import { Component, Inject, HostBinding } from '@angular/core';

import { UI_TREE_DEPTH } from '../config';

@Component({
  selector: 'ui-tree-inner',
  templateUrl: './tree-inner.component.html'
})
export class TreeInnerComponent {
  @HostBinding('style.paddingLeft')
  get paddingLeft() {
    return this.depth * 2 + 0.5 + 'em';
  }

  get left() {
    return (this.depth - 1) * 2 + 'em';
  }

  constructor(@Inject(UI_TREE_DEPTH) private depth: number) {
  }
}