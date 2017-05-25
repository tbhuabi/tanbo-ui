import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router';

import { AppComponent } from './app';
import { routes } from './app.routing';

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        BrowserModule,
        BrowserAnimationsModule
    ],
    declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
