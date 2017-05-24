import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocViewModule } from '../doc-view-module/doc-view.module';
import { routes } from './intro.routing';
import { NavComponent } from './components/nav.component';
import { IntroComponent } from './components/intro/intro.component';

@NgModule({
    imports: [
        DocViewModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        NavComponent,
        IntroComponent
    ]
})
export class IntroModule {
}