import { Component } from '@angular/core';
import { TabService } from '../../services/tab.service';

@Component({
    selector: 'ui-tab',
    templateUrl: './tab.component.html',
    providers: [
        TabService
    ]
})
export class TabComponent {
}