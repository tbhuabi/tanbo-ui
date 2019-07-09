import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  OnDestroy,
  QueryList
} from '@angular/core';
import { Subscription } from 'rxjs';

import { TabService } from '../tab/tab.service';
import { TabButtonComponent } from '../tab-button/tab-button.component';

@Component({
  selector: 'ui-tab-bar',
  templateUrl: './tab-bar.component.html'
})
export class TabBarComponent implements OnDestroy, AfterContentInit {
  @ContentChildren(TabButtonComponent) tabBarItems: QueryList<TabButtonComponent>;

  @Input()
  set tabIndex(v: number) {
    this._tabIndex = v;
    if (this.tabBarItems) {
      this.tabService.publishIndex(v);
    }
  }

  get tagIndex() {
    return this._tabIndex;
  }

  private _tabIndex = 0;
  private subs: Subscription[] = [];
  private itemSubs: Subscription[] = [];

  constructor(private tabService: TabService) {
  }

  listen() {
    this.itemSubs.forEach(item => {
      item.unsubscribe();
    });
    this.tabBarItems.forEach((item: TabButtonComponent, index: number) => {
      this.itemSubs.push(item.uiSelected.subscribe(() => {
        this.tabService.publishIndex(index);
      }));
    });
  }

  ngAfterContentInit() {
    // 当用户点击或选中某一个按扭时，发布相应事件
    this.listen();
    this.tabBarItems.changes.subscribe(() => {
      this.listen();
    });
    // 当用户切换tab时，显示/隐藏对应视图
    this.subs.push(this.tabService.tabIndex.subscribe((index: number) => {
      this.tabBarItems.forEach((item: TabButtonComponent, i: number) => {
        item.active = i === index;
      });
    }));

    this.tabService.publishIndex(this.tabIndex);
  }

  ngOnDestroy() {
    this.subs.forEach(item => {
      item.unsubscribe();
    });
    this.itemSubs.forEach(item => {
      item.unsubscribe();
    });
  }
}
