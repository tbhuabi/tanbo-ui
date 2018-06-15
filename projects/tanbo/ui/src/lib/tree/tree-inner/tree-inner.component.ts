import { Component, HostListener, ElementRef, Optional } from '@angular/core';

import { TreeContainerService } from '../tree-container/tree-container.service';

@Component({
  selector: 'ui-tree-inner',
  templateUrl: './tree-inner.component.html'
})
export class TreeInnerComponent {
  constructor(@Optional() private treeContainerService: TreeContainerService,
              private elementRef: ElementRef) {
  }

  @HostListener('mouseover')
  mouseOver() {
    if (this.treeContainerService) {
      this.treeContainerService.hover(this.elementRef.nativeElement);
    }
  }
}