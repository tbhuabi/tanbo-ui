import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { UiNativeModule } from '../modules/index';

import { AppComponent } from './app';
import { Page1Component } from './page1/page1';
import { Page2Component } from './page2/page2';
import { Page3Component } from './page3/page3';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        UiNativeModule,
        BrowserModule
    ],
    declarations: [
        AppComponent,
        Page1Component,
        Page2Component,
        Page3Component
    ],
    entryComponents: [
        Page1Component,
        Page2Component,
        Page3Component
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
