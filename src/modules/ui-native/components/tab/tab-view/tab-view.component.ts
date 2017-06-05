import { Component } from '@angular/core';
import { TabService } from '../../../services/tab.service';

@Component({
    selector: 'ui-tab-view',
    templateUrl: './tab-view.component.html'
})
export class TabViewComponent {
    constructor(private tabService: TabService) {
    }
}