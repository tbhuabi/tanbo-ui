import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UILayoutModule } from '../layout/layout.module';

import { CheckboxComponent } from './checkbox/checkbox.component';
import { InputDirective } from './input/input.directive';
import { InputAddonComponent } from './input-addon/input-addon.component';
import { InputGroupComponent } from './input-group/input-group.component';
import { OptionComponent } from './option/option.component';
import { RadioComponent } from './radio/radio.component';
import { SelectComponent } from './select/select.component';
import { SwitchComponent } from './switch/switch.component';
import { TreeComponent } from './tree/tree.component';
import { TreeItemComponent } from './tree-item/tree-item.component';
import { TreeSelectorComponent } from './tree-selector/tree-selector.component';

import { RadioStateService } from './radio/radio-state.service';
import { UI_SELECT_ARROW_CLASSNAME } from './config';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    UILayoutModule
  ],
  declarations: [
    CheckboxComponent,
    InputDirective,
    InputAddonComponent,
    InputGroupComponent,
    OptionComponent,
    RadioComponent,
    SelectComponent,
    SwitchComponent,
    TreeComponent,
    TreeItemComponent,
    TreeSelectorComponent
  ],
  exports: [
    CheckboxComponent,
    InputDirective,
    InputAddonComponent,
    InputGroupComponent,
    OptionComponent,
    RadioComponent,
    SelectComponent,
    SwitchComponent,
    TreeComponent,
    TreeItemComponent,
    TreeSelectorComponent
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