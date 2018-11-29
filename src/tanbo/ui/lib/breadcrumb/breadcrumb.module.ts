import { NgModule } from '@angular/core';

import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { BreadcrumbItemComponent } from './breadcrumb-item/breadcrumb-item.component';

@NgModule({
  declarations: [
    BreadcrumbComponent,
    BreadcrumbItemComponent
  ],
  exports: [
    BreadcrumbComponent,
    BreadcrumbItemComponent
  ]
})
export class UIBreadcrumbModule {

}