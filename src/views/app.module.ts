import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { UiComponentsModule, UiFormsModule, DialogService } from '../modules/index';

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
        DialogService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
