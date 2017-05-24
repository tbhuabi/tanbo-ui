import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocViewComponent } from './components/doc-view/doc-view';
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        DocViewComponent
    ],
    exports: [
        DocViewComponent
    ]
})
export class DocViewModule {
}