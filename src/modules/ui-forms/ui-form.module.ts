import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiComponentsModule } from '../ui-components/ui-components.module';

import { UiCheckboxRequiredValidatorDirective } from './directives/required-validator.directive';
import { ModelValidatorDirective } from './directives/model-validator.directive';
import { FormValidatorDirective } from './directives/form-validator.directive';
import { InputHostDirective } from './directives/input-host.directive';

import { SelectComponent } from './components/select/select.component';
import { OptionComponent } from './components/select/option/option.component';
import { InputComponent } from './components/input/input.component';
import { CheckboxComponent } from './components/input/checkbox/checkbox.component';
import { RadioComponent } from './components/input/radio/radio.component';
import { RangeComponent } from './components/input/range/range.component';
import { ButtonComponent } from './components/button/button.component';
import { SwitchComponent } from './components/switch/switch.component';

import { InputStateService } from './services/input-state.service';

@NgModule({
    imports: [
        CommonModule,
        UiComponentsModule
    ],
    declarations: [
        SelectComponent,
        OptionComponent,
        InputComponent,
        CheckboxComponent,
        RadioComponent,
        RangeComponent,
        ButtonComponent,
        SwitchComponent,

        UiCheckboxRequiredValidatorDirective,
        ModelValidatorDirective,
        FormValidatorDirective,
        InputHostDirective
    ],
    providers: [
        InputStateService
    ],
    exports: [
        SelectComponent,
        OptionComponent,
        InputComponent,
        ButtonComponent,
        SwitchComponent,

        UiCheckboxRequiredValidatorDirective,
        ModelValidatorDirective,
        FormValidatorDirective
    ]
})
export class UiFormsModule {
}