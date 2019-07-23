import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UIBaseModule } from '../base/base.module';
import { UIOtherModule } from '../other/other.module';

import { AppComponent } from './app/app.component';

@NgModule({
  imports: [
    CommonModule,
    UIBaseModule,
    UIOtherModule
  ],
  declarations: [
    AppComponent
  ],
  exports: [
    AppComponent
  ]
})
export class UIAppModule {
}
