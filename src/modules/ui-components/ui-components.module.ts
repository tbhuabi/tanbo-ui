import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UiDirectivesModule } from '../ui-directives/ui-directives.module';

import { DropDownComponent } from './components/drop-down/drop-down.component';
@NgModule({
    imports: [
        BrowserAnimationsModule,
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