import { Routes } from '@angular/router';

export const routes: Routes = [{
    path: '',
    redirectTo: '/intro',
    pathMatch: 'full'
}, {
    path: 'intro',
    loadChildren() {
        return new Promise(resolve => {
            (require as any).ensure([], require => {
                resolve(require('./intro-module/intro.module').IntroModule);
            });
        });
    }
}];