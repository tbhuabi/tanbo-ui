import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { UiComponentsModule, UiFormsModule, DialogService, NotifyService } from '../modules/index';

import { AppComponent } from './app';

@NgModule({
    imports: [
        FormsModule,
        UiComponentsModule,
        UiFormsModule,
        BrowserModule
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        DialogService,
        NotifyService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
