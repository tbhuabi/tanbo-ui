import { NgModule } from '@angular/core';

import { UIModalModule } from '../modal/modal.module';
import { UINotifyModule } from '../notify/notify.module';
import { UIOtherModule } from '../other/other.module';

import { AppComponent } from './app/app.component';

@NgModule({
  imports: [
    UIModalModule,
    UINotifyModule,
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
