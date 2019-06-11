import { NgModule } from '@angular/core';

import { UIModalModule } from '../modal/modal.module';
import { UIOtherModule } from '../other/other.module';

import { AppComponent } from './app/app.component';

@NgModule({
  imports: [
    UIModalModule,
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