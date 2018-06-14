import { NgModule } from '@angular/core';

import { ContainerComponent } from './container/container.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    ContainerComponent,
    DropdownComponent,
    DropdownMenuComponent,
    HeaderComponent,
  ],
  exports: [
    ContainerComponent,
    DropdownComponent,
    DropdownMenuComponent,
    HeaderComponent,
  ]
})
export class UILayoutModule {
}