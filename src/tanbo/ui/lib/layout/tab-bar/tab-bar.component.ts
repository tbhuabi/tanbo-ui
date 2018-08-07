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
  @Input()
  tabIndex: number = 0;
  @ContentChildren(TabButtonComponent)
  tabBarItems: QueryList<TabButtonComponent>;

  private subs: Array<Subscription> = [];

  constructor(private tabService: TabService) {
  }

  ngAfterContentInit() {
    // 当用户点击或选中某一个按扭时，发布相应事件
    this.tabBarItems.forEach((item: TabButtonComponent, index: number) => {
      const sub = item.uiSelected.subscribe(() => {
        this.tabService.publishIndex(index);
      });
      this.subs.push(sub);
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
  }
}