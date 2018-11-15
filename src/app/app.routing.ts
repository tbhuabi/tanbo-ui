import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../pages/home/home';
import { DetailComponent } from '../pages/detail/detail.component';
import { TestComponent } from '../pages/test/test';

const appRoutes: Routes = [{
  path: 'home',
  component: HomeComponent
}, {
  path: 'detail',
  component: DetailComponent
}, {
  path: 'test',
  component: TestComponent
}, {
  path: 'lazy',
  loadChildren: '../pages/lazy/lazy.module#LazyModule'
}];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
