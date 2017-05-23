import { Component, OnInit } from '@angular/core';

import { ConfirmConfig, ConfirmService, NotifyService, NotifyConfig } from '../modules/index';

@Component({
    selector: 'ui-app',
    templateUrl: 'app.html',
    styleUrls: ['./app.scss']
})
export class AppComponent implements OnInit {
    width: number = 0;
    open: boolean = false;

    constructor(private notifyService: NotifyService,
                private dialogService: ConfirmService) {
    }

    ngOnInit() {
    }

    show() {
        let config: ConfirmConfig = {
            title: '标题',
            content: '内容'
        };
        this.dialogService.show(config).then(y => {
            this.open = true;
            console.log(y);
        }, n => {
            this.open = false;
            console.log(n);
        });
    }

    notify() {
        let config: NotifyConfig = {
            type: 'success',
            autoHide: true,
            content: '这里是内容'
        };
        this.notifyService.push(config);
    }
}
