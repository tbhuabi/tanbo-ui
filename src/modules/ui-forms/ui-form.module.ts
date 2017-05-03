import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiComponentsModule } from '../ui-components/ui-components.module';

import { SelectComponent } from './components/select/select.component';
import { OptionComponent } from './components/option/option.component';

@NgModule({
    imports: [
        CommonModule,
        UiComponentsModule
    ],
    declarations: [
        SelectComponent,
        OptionComponent
    ],
    exports: [
        SelectComponent,
        OptionComponent
    ]
})
export class UiFormsModule {
}