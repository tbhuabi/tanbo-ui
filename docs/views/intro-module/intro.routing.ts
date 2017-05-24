import { Routes } from '@angular/router';
import { NavComponent } from './components/nav.component';
import { IntroComponent } from './components/intro/intro.component';
import { InstallComponent } from './components/install/install.component';

export const routes: Routes = [{
    path: '',
    component: NavComponent,
    children: [{
        path: 'intro',
        component: IntroComponent,
        data: {
            doc: require('!!raw-loader!./components/intro/intro.md')
        }
    }, {
        path: 'install',
        component: InstallComponent,
        data: {
            doc: require('!!raw-loader!./components/install/install.md')
        }
    }]
}];