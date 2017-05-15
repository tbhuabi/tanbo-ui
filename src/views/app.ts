import { Component, OnInit } from '@angular/core';

import { DialogService, DialogConfig } from '../modules/ui-components/services/dialog.service';

@Component({
    selector: 'ui-app',
    templateUrl: 'app.html',
    styleUrls: ['./app.scss']
})
export class AppComponent implements OnInit {
    constructor(private dialogService: DialogService) {
    }

    ngOnInit() {
        let config: DialogConfig = {
            title: 'aaa',
            content: 'bbb'
        };
        this.dialogService.show(config).then(y => {
            console.log(y);
        }, n => {
            console.log(n);
        });
    }
}
