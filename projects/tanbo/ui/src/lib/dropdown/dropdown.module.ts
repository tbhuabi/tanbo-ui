import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UIOtherModule } from '../other/other.module';

import { DropdownComponent } from './dropdown/dropdown.component';
import { DropdownInputComponent } from './dropdown-input/dropdown-input.component';
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';
import { UI_DROPDOWN_ARROW_CLASSNAME } from './help';

@NgModule({
  imports: [
    CommonModule,
    UIOtherModule
  ],
  declarations: [
    DropdownComponent,
    DropdownInputComponent,
    DropdownMenuComponent
  ],
  exports: [
    DropdownComponent,
    DropdownInputComponent,
    DropdownMenuComponent
  ],
  providers: [{
    provide: UI_DROPDOWN_ARROW_CLASSNAME,
    useValue: 'ui-caret'
  }]
})
export class UIDropdownModule {
}
