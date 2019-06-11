import { NgModule } from '@angular/core';

import { DropdownComponent } from './dropdown/dropdown.component';
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';
@NgModule({
  declarations: [
    DropdownComponent,
    DropdownMenuComponent
  ],
  exports: [
    DropdownComponent,
    DropdownMenuComponent
  ]
})
export class UIDropdownModule {
}