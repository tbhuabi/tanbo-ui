import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UIModule } from '../../tanbo/ui/public_api';

import { routes } from './lazy.routing';

import { TestComponent } from './test/test.component';

@NgModule({
  imports: [
    FormsModule,
    UIModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    TestComponent
  ]
})
export class LazyModule {

}