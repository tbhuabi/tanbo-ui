import { NgModule } from '@angular/core';

import { ContainerComponent } from './container/container.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';
import { HeaderComponent } from './header/header.component';
import { TabComponent } from './tab/tab.component';
import { TabBarComponent } from './tab-bar/tab-bar.component';
import { TabBarItemComponent } from './tab-bar-item/tab-bar-item.component';
import { TabViewComponent } from './tab-view/tab-view.component';
import { TabViewItemComponent } from './tab-view-item/tab-view-item.component';

@NgModule({
  declarations: [
    ContainerComponent,
    DropdownComponent,
    DropdownMenuComponent,
    HeaderComponent,
    TabComponent,
    TabBarComponent,
    TabBarItemComponent,
    TabViewComponent,
    TabViewItemComponent
  ],
  exports: [
    ContainerComponent,
    DropdownComponent,
    DropdownMenuComponent,
    HeaderComponent,
    TabComponent,
    TabBarComponent,
    TabBarItemComponent,
    TabViewComponent,
    TabViewItemComponent
  ]
})
export class UILayoutModule {
}