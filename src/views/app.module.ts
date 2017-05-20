import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { UiComponentsModule, UiFormsModule, DialogService, NotifyService } from '../modules/index';
import { routing } from './app.routing';
import { Page1Component } from './page1/page1';
import { Page2Component } from './page2/page2';

import { AppComponent } from './app';

@NgModule({
    imports: [
        routing,
        FormsModule,
        UiComponentsModule,
        UiFormsModule,
        BrowserModule
    ],
    declarations: [
        AppComponent,
        Page1Component,
        Page2Component
    ],
    providers: [
        DialogService,
        NotifyService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
