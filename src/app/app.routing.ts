import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../pages/home/home';
import { DetailComponent } from '../pages/detail/detail.component';

const appRoutes: Routes = [{
  path: '',
  redirectTo: '/home',
  pathMatch: 'full'
}, {
  path: 'home',
  component: HomeComponent
}, {
  path: 'detail',
  component: DetailComponent
}];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
