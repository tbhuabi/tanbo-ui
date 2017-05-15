import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { UiComponentsModule } from '../modules/ui-components/ui-components.module';
import { DialogService } from '../modules/ui-components/services/dialog.service';
import { UiFormsModule } from '../modules/ui-forms/ui-form.module';

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
