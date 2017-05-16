import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiDirectivesModule } from '../ui-directives/ui-directives.module';

import { DropDownComponent } from './components/drop-down/drop-down.component';
import { DropDownFixedComponent } from './components/drop-down-fixed/drop-down-fixed.component';
import { DropDownMenuComponent } from './components/drop-down-menu/drop-down-menu.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { DialogComponent } from './components/dialog/dialog.component';


@NgModule({
    imports: [
        CommonModule,
        UiDirectivesModule
    ],
    declarations: [
        DropDownComponent,
        DropDownFixedComponent,
        DropDownMenuComponent,
        PaginationComponent,
        DialogComponent
    ],
    exports: [
        DropDownComponent,
        DropDownFixedComponent,
        DropDownMenuComponent,
        PaginationComponent,
        DialogComponent
    ]
})
export class UiComponentsModule {
}