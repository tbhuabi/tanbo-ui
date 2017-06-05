import { Component } from '@angular/core';

import { Page1Component } from './page1/page1';

// import { Page3Component } from './page3/page3';

@Component({
    selector: 'ui-test',
    templateUrl: 'app.html',
    styleUrls: ['./app.scss']
})
export class AppComponent {
    rootPage: any = Page1Component;
}
