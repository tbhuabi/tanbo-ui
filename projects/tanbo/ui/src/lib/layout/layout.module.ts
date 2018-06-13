import { NgModule } from '@angular/core';

import { ContainerComponent } from './container/container.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
      ContainerComponent,
      HeaderComponent
  ],
  exports: [
      ContainerComponent,
      HeaderComponent
  ]
})
export class UILayoutModule {
}