import { NgModule } from '@angular/core';

import { DropdownComponent } from './dropdown/dropdown.component';
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';
import { ItemComponent } from './item/item.component';
import { TabComponent } from './tab/tab.component';
import { TabBarComponent } from './tab-bar/tab-bar.component';
import { TabButtonComponent } from './tab-button/tab-button.component';
import { TabViewComponent } from './tab-view/tab-view.component';
import { TabViewItemComponent } from './tab-view-item/tab-view-item.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';

@NgModule({
  declarations: [
    DropdownComponent,
    DropdownMenuComponent,
    ItemComponent,
    TabComponent,
    TabBarComponent,
    TabButtonComponent,
    TabViewComponent,
    TabViewItemComponent,
    ToolBarComponent
  ],
  exports: [
    DropdownComponent,
    DropdownMenuComponent,
    ItemComponent,
    TabComponent,
    TabBarComponent,
    TabButtonComponent,
    TabViewComponent,
    TabViewItemComponent,
    ToolBarComponent
  ]
})
export class UILayoutModule {
}