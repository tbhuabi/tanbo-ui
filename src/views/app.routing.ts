import { Routes } from '@angular/router';

import { Page1Component } from './page1/page1';
import { Page2Component } from './page2/page2';
import { Page3Component } from './page3/page3';

export const routes: Routes = [{
    path: '',
    redirectTo: '/page1',
    pathMatch: 'full'
}, {
    path: 'page1',
    component: Page1Component
}, {
    path: 'page2',
    component: Page2Component
}, {
    path: 'page3',
    component: Page3Component
}];