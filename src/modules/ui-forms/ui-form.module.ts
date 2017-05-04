import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiComponentsModule } from '../ui-components/ui-components.module';

import { SelectComponent } from './components/select/select.component';
import { OptionComponent } from './components/option/option.component';
import { RadioComponent } from './components/radio/radio.component';

@NgModule({
    imports: [
        CommonModule,
        UiComponentsModule
    ],
    declarations: [
        SelectComponent,
        OptionComponent,
        RadioComponent
    ],
    exports: [
        SelectComponent,
        OptionComponent,
        RadioComponent
    ]
})
export class UiFormsModule {
}