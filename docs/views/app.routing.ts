import { Routes } from '@angular/router';

export const routes: Routes = [{
    path: '',
    redirectTo: '/base-info',
    pathMatch: 'full'
}, {
    path: 'base-info',
    loadChildren() {
        return new Promise(resolve => {
            (require as any).ensure([], require => {
                resolve(require('./intro-module/intro.module').IntroModule);
            });
        });
    }
}, {
    path: 'components',
    loadChildren() {
        return new Promise(resolve => {
            (require as any).ensure([], require => {
                resolve(require('./components-example-module/components-example.module').ComponentsExampleModule);
            });
        });
    }
}];