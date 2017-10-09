import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { UIComponentsModule, UIFormsModule, UIHttp } from '../modules/index';

import { PageTransferStationService } from '../services/page-transfer-station';

import { AppComponent } from './app';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        BrowserModule,
        UIComponentsModule,
        UIFormsModule,
        HttpModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent],
    providers: [
        PageTransferStationService,
        UIHttp
    ]
})
export class AppModule {
}
