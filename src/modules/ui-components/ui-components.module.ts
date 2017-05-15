import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiDirectivesModule } from '../ui-directives/ui-directives.module';

import { DropDownComponent } from './components/drop-down/drop-down.component';
import { DropDownFixedComponent } from './components/drop-down-fixed/drop-down-fixed.component';
import { DropDownMenuComponent } from './components/drop-down-menu/drop-down-menu.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { DialogTitleComponent } from './components/dialog-title/dialog-title.component';
import { DialogBodyComponent } from './components/dialog-body/dialog-body.component';
import { DialogFooterComponent } from './components/dialog-footer/dialog-footer.component';

import { DialogService } from './services/dialog.service';

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
        DialogComponent,
        DialogTitleComponent,
        DialogBodyComponent,
        DialogFooterComponent,

        DialogService
    ],
    exports: [
        DropDownComponent,
        DropDownFixedComponent,
        DropDownMenuComponent,
        PaginationComponent,
        DialogComponent,
        DialogTitleComponent,
        DialogBodyComponent,
        DialogFooterComponent,

        DialogService
    ],
    providers: [
        // DialogService
    ]
})
export class UiComponentsModule {
}