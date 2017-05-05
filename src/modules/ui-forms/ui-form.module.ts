import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiComponentsModule } from '../ui-components/ui-components.module';

import { UiCheckboxRequiredValidatorDirective } from './directives/required-validator.directive';

import { SelectComponent } from './components/select/select.component';
import { OptionComponent } from './components/option/option.component';
import { InputComponent } from './components/input/input.component';

@NgModule({
    imports: [
        CommonModule,
        UiComponentsModule
    ],
    declarations: [
        SelectComponent,
        OptionComponent,
        InputComponent,

        UiCheckboxRequiredValidatorDirective
    ],
    exports: [
        SelectComponent,
        OptionComponent,
        InputComponent,

        UiCheckboxRequiredValidatorDirective
    ]
})
export class UiFormsModule {
}