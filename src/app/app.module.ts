import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { UIModule } from '@tanbo/ui';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    UIModule
  ],
  declarations: [
    AppComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
