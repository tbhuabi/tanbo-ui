import { NgModule } from '@angular/core';

import { TabComponent } from './tab/tab.component';
import { TabBarComponent } from './tab-bar/tab-bar.component';
import { TabButtonComponent } from './tab-button/tab-button.component';
import { TabViewComponent } from './tab-view/tab-view.component';
import { TabViewItemComponent } from './tab-view-item/tab-view-item.component';

@NgModule({
  declarations: [
    TabComponent,
    TabBarComponent,
    TabButtonComponent,
    TabViewComponent,
    TabViewItemComponent
  ],
  exports: [
    TabComponent,
    TabBarComponent,
    TabButtonComponent,
    TabViewComponent,
    TabViewItemComponent
  ]
})
export class UITabModule {
}