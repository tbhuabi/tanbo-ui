import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { UIComponentsModule, UIFormsModule } from '../modules/index';

import { AppComponent } from './app';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        BrowserModule,
        UIComponentsModule,
        UIFormsModule,
        HttpClientModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
