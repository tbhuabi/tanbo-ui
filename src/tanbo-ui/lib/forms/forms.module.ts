import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UILayoutModule } from '../layout/layout.module';
import { UIOtherModule } from '../other/other.module';

import { CheckboxComponent } from './checkbox/checkbox.component';
import { DateComponent } from './date/date.component';
import { InputDirective } from './input/input.directive';
import { InputAddonComponent } from './input-addon/input-addon.component';
import { InputGroupComponent } from './input-group/input-group.component';
import { OptionComponent } from './option/option.component';
import { PaginationComponent } from './pagination/pagination.component';
import { RadioComponent } from './radio/radio.component';
import { SelectComponent } from './select/select.component';
import { SwitchComponent } from './switch/switch.component';

import { RadioStateService } from './radio/radio-state.service';
import { UI_SELECT_ARROW_CLASSNAME } from './config';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    UILayoutModule,
    UIOtherModule
  ],
  declarations: [
    CheckboxComponent,
    DateComponent,
    InputDirective,
    InputAddonComponent,
    InputGroupComponent,
    OptionComponent,
    PaginationComponent,
    RadioComponent,
    SelectComponent,
    SwitchComponent
  ],
  exports: [
    CheckboxComponent,
    DateComponent,
    InputDirective,
    InputAddonComponent,
    InputGroupComponent,
    OptionComponent,
    PaginationComponent,
    RadioComponent,
    SelectComponent,
    SwitchComponent
  ],
  providers: [
    RadioStateService, {
      provide: UI_SELECT_ARROW_CLASSNAME,
      useValue: 'ui-caret'
    }
  ]
})
export class UIFormsModule {
}