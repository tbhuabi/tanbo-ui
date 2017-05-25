import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DocViewModule } from '../doc-view-module/doc-view.module';
import { UiComponentsModule, ConfirmService, NotifyService } from '../../../src/modules/index';

import { routes } from './components-example.routing';

import { NavComponent } from './components/nav.component';
import { ConfirmExampleComponent } from './components/confirm/confirm-example.component';

@NgModule({
    imports: [
        CommonModule,
        UiComponentsModule,
        DocViewModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        NavComponent,
        ConfirmExampleComponent
    ],
    providers: [
        ConfirmService,
        NotifyService
    ]
})
export class ComponentsExampleModule {
}