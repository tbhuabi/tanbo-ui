import { Routes } from '@angular/router';

import { NavComponent } from './components/nav.component';
import { ConfirmExampleComponent } from './components/confirm/confirm-example.component';
export const routes: Routes = [{
    path: '',
    component: NavComponent,
    children: [{
        path: 'confirm',
        component: ConfirmExampleComponent,
        data: {
            ts: require('!!raw-loader!./components/confirm/confirm-example.component'),
            html: require('./components/confirm/confirm-example.component.html'),
            doc: require('./components/confirm/confirm-example.component.md')
        }
    }]
}];