import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UIDropdownModule } from '../dropdown/dropdown.module';
import { UIOtherModule } from '../other/other.module';

import { BtnGroupComponent } from './btn-group/btn-group.component';
import { ButtonComponent } from './button/button.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DateComponent } from './date/date.component';
import { FileComponent } from './file/file.component';
import { InputDirective } from './input/input.directive';
import { InputAddonComponent } from './input-addon/input-addon.component';
import { InputGroupComponent } from './input-group/input-group.component';
import { OptionComponent } from './option/option.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PickerComponent } from './picker/picker.component';
import { RadioComponent } from './radio/radio.component';
import { RangeComponent } from './range/range.component';
import { SegmentComponent } from './segment/segment.component';
import { SegmentButtonComponent } from './segment-button/segment-button.component';
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

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    UIDropdownModule,
    UIOtherModule
  ],
  declarations: [
    BtnGroupComponent,
    ButtonComponent,
    CheckboxComponent,
    DateComponent,
    FileComponent,
    InputDirective,
    InputAddonComponent,
    InputGroupComponent,
    OptionComponent,
    PaginationComponent,
    PickerComponent,
    RadioComponent,
    RangeComponent,
    SegmentComponent,
    SegmentButtonComponent,
    SelectComponent,
    SwitchComponent,

    EqualValidator,
    IntegerValidator,
    SubmitDirective,
    RequiredTrueValidator,
    RequiredValidator,
    PickerRequiredValidator,
  ],
  exports: [
    BtnGroupComponent,
    ButtonComponent,
    CheckboxComponent,
    DateComponent,
    FileComponent,
    InputDirective,
    InputAddonComponent,
    InputGroupComponent,
    OptionComponent,
    PaginationComponent,
    PickerComponent,
    RadioComponent,
    RangeComponent,
    SegmentComponent,
    SegmentButtonComponent,
    SelectComponent,
    SwitchComponent,

    EqualValidator,
    IntegerValidator,
    SubmitDirective,
    RequiredTrueValidator,
    RequiredValidator,
    PickerRequiredValidator,
  ],
  providers: [
    RadioStateService
  ]
})
export class UIFormsModule {
}
