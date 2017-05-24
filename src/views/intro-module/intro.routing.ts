import { Routes } from '@angular/router';
import { NavComponent } from './components/nav.component';
import { IntroComponent } from './components/intro/intro.component';

export const routes: Routes = [{
    path: '',
    component: NavComponent,
    children: [{
        path: '',
        component: IntroComponent,
        data: {
            doc: require('!!raw-loader!./components/intro/intro.md')
        }
    }]
}];