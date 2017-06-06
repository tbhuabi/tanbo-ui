import { Component } from '@angular/core';

import { ChildComponent } from './tab1/child/child';
import { Child3Component } from './tab2/child/child';

@Component({
    templateUrl: './tab.html'
})
export class TabComponent {
    page =  ChildComponent;
    page2 =  Child3Component;
}