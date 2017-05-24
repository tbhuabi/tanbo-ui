import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { UiComponentsModule, UiFormsModule, ConfirmService, NotifyService } from '../../src/modules/index';

import { AppComponent } from './app';
import { routes } from './app.routing';

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        FormsModule,
        UiComponentsModule,
        UiFormsModule,
        BrowserModule
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        ConfirmService,
        NotifyService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
