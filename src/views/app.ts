import { Component, OnInit } from '@angular/core';

import { DialogService, DialogConfig } from '../modules/index';

@Component({
    selector: 'ui-app',
    templateUrl: 'app.html',
    styleUrls: ['./app.scss']
})
export class AppComponent implements OnInit {
    open: boolean = false;

    constructor(private dialogService: DialogService) {
    }

    ngOnInit() {
    }

    show() {
        let config: DialogConfig = {
            title: 'aaa',
            content: 'bbb'
        };
        this.dialogService.show(config).then(y => {
            this.open = true;
            console.log(y);
        }, n => {
            this.open = false;
            console.log(n);
        });
    }
}
