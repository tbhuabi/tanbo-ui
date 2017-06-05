import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';

import { TabService } from '../../../services/tab.service';
import { TabBarItemComponent } from './tab-bar-item/tab-bar-item.component';

@Component({
    selector: 'ui-tab-bar',
    templateUrl: './tab-bar.component.html'
})
export class TabBarComponent implements AfterContentInit {
    @ContentChildren(TabBarItemComponent)
    tabViewItems: QueryList<TabBarItemComponent>;

    constructor(private tabService: TabService) {
    }

    ngAfterContentInit() {
        this.tabViewItems.forEach((item: TabBarItemComponent, index: number) => {
            item.selected.subscribe(() => {
                this.tabService.publishIndex(index);
            });
        })
    }
}