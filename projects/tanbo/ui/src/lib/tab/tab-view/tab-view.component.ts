import { AfterContentInit, Component, ContentChildren, QueryList, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { TabService } from '../tab/tab.service';
import { TabViewItemComponent } from '../tab-view-item/tab-view-item.component';

@Component({
  selector: 'ui-tab-view',
  templateUrl: './tab-view.component.html'
})
export class TabViewComponent implements AfterContentInit, OnInit, OnDestroy {
  @ContentChildren(TabViewItemComponent)
  tabViewItems: QueryList<TabViewItemComponent>;

  private subs: Array<Subscription> = [];
  private index = 0;

  constructor(private tabService: TabService) {
  }

  ngOnInit(): void {
    this.subs.push(this.tabService.tabIndex.subscribe((index: number) => {
      this.index = index;
      this.setState();
    }));
  }

  ngAfterContentInit() {
    // 订阅tab切换事件，如果发生切换，显示/隐藏对应视图
    this.setState();
  }

  ngOnDestroy() {
    this.subs.forEach(item => item.unsubscribe());
  }

  setState() {
    this.tabViewItems?.forEach((item: TabViewItemComponent, i: number) => {
      item.active = i === this.index;
    });
  }
}
