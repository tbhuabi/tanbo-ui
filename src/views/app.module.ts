import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { UiComponentsModule, UiFormsModule, ConfirmService, NotifyService } from '../modules/index';

import { DocViewComponent } from '../components/doc-view/doc-view';

import { AppComponent } from './app';

@NgModule({
    imports: [
        // routing,
        FormsModule,
        UiComponentsModule,
        UiFormsModule,
        BrowserModule
    ],
    declarations: [
        AppComponent,
        DocViewComponent
    ],
    providers: [
        ConfirmService,
        NotifyService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
