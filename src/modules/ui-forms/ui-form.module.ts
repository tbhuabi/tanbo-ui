import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiComponentsModule } from '../ui-components/ui-components.module';

import { SelectComponent } from './components/select/select.component';
import { OptionComponent } from './components/option/option.component';
import { RadioComponent } from './components/radio/radio.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';

@NgModule({
    imports: [
        CommonModule,
        UiComponentsModule
    ],
    declarations: [
        SelectComponent,
        OptionComponent,
        RadioComponent,
        CheckboxComponent
    ],
    exports: [
        SelectComponent,
        OptionComponent,
        RadioComponent,
        CheckboxComponent
    ]
})
export class UiFormsModule {
}