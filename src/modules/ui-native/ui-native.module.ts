import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './components/app/app.component';
import { ContentComponent } from './components/content/content.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { PageComponent } from './components/page/page.component';
import { TabComponent } from './components/tab/tab.component';
import { TabViewComponent } from './components/tab/tab-view/tab-view.component';
import { TabViewItemComponent } from './components/tab/tab-view/tab-view-item/tab-view-item.component';
import { TabBarComponent } from './components/tab/tab-bar/tab-bar.component';
import { TabBarItemComponent } from './components/tab/tab-bar/tab-bar-item/tab-bar-item.component';

import { TabService } from './services/tab.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        AppComponent,
        ContentComponent,
        FooterComponent,
        HeaderComponent,
        PageComponent,
        TabComponent,
        TabViewComponent,
        TabViewItemComponent,
        TabBarComponent,
        TabBarItemComponent
    ],
    exports: [
        AppComponent,
        ContentComponent,
        FooterComponent,
        HeaderComponent,
        PageComponent,
        TabComponent,
        TabViewComponent,
        TabViewItemComponent,
        TabBarComponent,
        TabBarItemComponent
    ],
    providers: [
        TabService
    ]
})
export class UiNativeModule {
}