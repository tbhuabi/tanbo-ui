import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UILayoutModule } from '../layout/layout.module';
import { UIOtherModule } from '../other/other.module';

import { BtnGroupComponent } from './btn-group/btn-group.component';
import { ButtonComponent } from './button/button.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DateComponent } from './date/date.component';
import { DropdownInputComponent } from './dropdown-input/dropdown-input.component';
import { EditorComponent } from './editor/editor.component';
import { MarkdownEditorComponent } from './markdown-editor/markdown-editor.component';
import { FileComponent } from './file/file.component';
import { InputDirective } from './input/input.directive';
import { InputAddonComponent } from './input-addon/input-addon.component';
import { InputGroupComponent } from './input-group/input-group.component';
import { OptionComponent } from './option/option.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PickerComponent } from './picker/picker.component';
import { RadioComponent } from './radio/radio.component';
import { RangeComponent } from './range/range.component';
import { SelectComponent } from './select/select.component';
import { SwitchComponent } from './switch/switch.component';

import { EqualValidator } from './equal-validator.directive';
import { IntegerValidator } from './integer-validator.directive';
import {
  RequiredTrueValidator,
  RequiredValidator,
  PickerRequiredValidator
} from './required-validator.directive';
import { SubmitDirective } from './submit.directive';

import { RadioStateService } from './radio/radio-state.service';
import { UI_SELECT_ARROW_CLASSNAME } from './help';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    UILayoutModule,
    UIOtherModule
  ],
  declarations: [
    BtnGroupComponent,
    ButtonComponent,
    CheckboxComponent,
    DateComponent,
    DropdownInputComponent,
    EditorComponent,
    FileComponent,
    InputDirective,
    InputAddonComponent,
    InputGroupComponent,
    MarkdownEditorComponent,
    OptionComponent,
    PaginationComponent,
    PickerComponent,
    RadioComponent,
    RangeComponent,
    SelectComponent,
    SwitchComponent,

    EqualValidator,
    IntegerValidator,
    SubmitDirective,
    RequiredTrueValidator,
    RequiredValidator,
    PickerRequiredValidator
  ],
  exports: [
    BtnGroupComponent,
    ButtonComponent,
    CheckboxComponent,
    DateComponent,
    DropdownInputComponent,
    EditorComponent,
    FileComponent,
    InputDirective,
    InputAddonComponent,
    InputGroupComponent,
    MarkdownEditorComponent,
    OptionComponent,
    PaginationComponent,
    PickerComponent,
    RadioComponent,
    RangeComponent,
    SelectComponent,
    SwitchComponent,

    EqualValidator,
    IntegerValidator,
    SubmitDirective,
    RequiredTrueValidator,
    RequiredValidator,
    PickerRequiredValidator
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