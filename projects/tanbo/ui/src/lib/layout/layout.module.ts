import { NgModule } from '@angular/core';

import { ContainerComponent } from './components/container/container.component';
import { HeaderComponent } from './components/header/header.component';

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
export class LayoutModule {
}