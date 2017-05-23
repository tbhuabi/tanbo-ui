import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UiDirectivesModule } from '../ui-directives/ui-directives.module';

import { DropDownComponent } from './components/drop-down/drop-down.component';
import { DropDownFixedComponent } from './components/drop-down/drop-down-fixed/drop-down-fixed.component';
import { DropDownMenuComponent } from './components/drop-down/drop-down-menu/drop-down-menu.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { NotifyComponent } from './components/notify/notify.component';
import { StarrySkyComponent } from './components/starry-sky/starry-sky.component';
import { ViewLoadingBarComponent } from './components/view-loading-bar/view-loading-bar.component';
import { ToolbarComponent } from './components/toolbar/ui-toolbar.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        UiDirectivesModule
    ],
    declarations: [
        DropDownComponent,
        DropDownFixedComponent,
        DropDownMenuComponent,
        PaginationComponent,
        ConfirmComponent,
        NotifyComponent,
        StarrySkyComponent,
        ViewLoadingBarComponent,
        ToolbarComponent
    ],
    exports: [
        DropDownComponent,
        DropDownFixedComponent,
        DropDownMenuComponent,
        PaginationComponent,
        ConfirmComponent,
        NotifyComponent,
        StarrySkyComponent,
        ViewLoadingBarComponent,
        ToolbarComponent
    ]
})
export class UiComponentsModule {
}
