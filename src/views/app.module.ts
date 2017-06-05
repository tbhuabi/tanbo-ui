import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { UiFormsModule } from '../modules/index';

import { AppComponent } from './app';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        UiFormsModule,
        BrowserModule
    ],
    declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
