import { Component } from '@angular/core';
import { TabService } from '../../../services/tab.service';

@Component({
    selector: 'ui-tab-bar',
    templateUrl: './tab-bar.component.html'
})
export class TabBarComponent {
    constructor(private tabService: TabService) {
    }
}