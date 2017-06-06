import { Component } from '@angular/core';

import { Page1Component } from './page1/page1';
import { TabComponent } from './tab/tab';

@Component({
    selector: 'ui-test',
    templateUrl: 'app.html',
    styleUrls: ['./app.scss']
})
export class AppComponent {
    rootPage: any = TabComponent;
}
