import { NgModule } from '@angular/core';

import { ChartsComponent } from './components/charts/charts.component';

@NgModule({
    declarations: [
        ChartsComponent
    ],
    exports: [
        ChartsComponent
    ]
})
export class UiChartsModule {
}