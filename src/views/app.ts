import { Component } from '@angular/core';
import { NotifyService, NotifyType, NotifyConfig } from '../modules/index';

@Component({
    selector: 'ui-app',
    templateUrl: 'app.html',
    styleUrls: ['./app.scss']
})
export class AppComponent {
    model: boolean = true;
    currentPage: number = 1;

    constructor(private notifyService: NotifyService) {
    }

    show() {
        let config: NotifyConfig = {
            content: 'afdsafdsfdsa',
            type: NotifyType.Danger
        };
        this.notifyService.push(config);
    }
}
