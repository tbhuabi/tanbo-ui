import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { UiComponentsModule, UiFormsModule, UiHttp } from '../modules/index';

import { PageTransferStationService } from '../services/page-transfer-station';

import { AppComponent } from './app';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        BrowserModule,
        UiComponentsModule,
        UiFormsModule,
        HttpModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent],
    providers: [
        PageTransferStationService,
        UiHttp
    ]
})
export class AppModule {
}
