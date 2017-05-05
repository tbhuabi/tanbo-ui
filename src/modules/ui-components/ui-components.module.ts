import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiDirectivesModule } from '../ui-directives/ui-directives.module';

import { DropDownComponent } from './components/drop-down/drop-down.component';
@NgModule({
    imports: [
        CommonModule,
        UiDirectivesModule
    ],
    declarations: [
        DropDownComponent
    ],
    exports: [
        DropDownComponent
    ]
})
export class UiComponentsModule {
}