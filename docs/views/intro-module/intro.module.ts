import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocViewModule } from '../doc-view-module/doc-view.module';
import { routes } from './intro.routing';
import { NavComponent } from './components/nav.component';
import { IntroComponent } from './components/intro/intro.component';
import { InstallComponent } from './components/install/install.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { ColorComponent } from './components/color/color.component';
import { FloatComponent } from './components/float/float.component';
import { FormsComponent } from './components/forms/forms.component';
import { GridComponent } from './components/grid/grid.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ListComponent } from './components/list/list.component';
import { TableComponent } from './components/table/table.component';
import { TextComponent } from './components/text/text.component';
import { HelpComponent } from './components/help/help.component';

@NgModule({
    imports: [
        DocViewModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        NavComponent,
        IntroComponent,
        InstallComponent,
        ButtonsComponent,
        ColorComponent,
        FloatComponent,
        FormsComponent,
        GridComponent,
        LayoutComponent,
        ListComponent,
        TableComponent,
        TextComponent,
        HelpComponent
    ]
})
export class IntroModule {
}