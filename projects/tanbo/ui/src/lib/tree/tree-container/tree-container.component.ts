import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { TreeContainerService } from './tree-container.service';

@Component({
  selector: 'ui-tree-container',
  templateUrl: './tree-container.component.html',
  providers: [
    TreeContainerService
  ]
})
export class TreeContainerComponent implements OnInit, OnDestroy {
  hoverTop: number = 0;
  hoverHeight: number = 0;
  private subs: Subscription[] = [];

  constructor(private treeContainerService: TreeContainerService,
              private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.subs.push(this.treeContainerService.hoverElement.subscribe(element => {
      this.hoverTop = this.getOffsetTop(element);
      this.hoverHeight = element.offsetHeight;
    }));
  }

  ngOnDestroy() {
    this.subs.forEach(item => item.unsubscribe());
  }

  getOffsetTop(element: HTMLElement) {
    let top = 0;
    const rootElement = this.elementRef.nativeElement;
    let selfElement: any = element;
    while (selfElement.offsetParent && selfElement !== rootElement) {
      top += selfElement.offsetTop;
      selfElement = selfElement.offsetParent;
    }
    return top;
  }
}