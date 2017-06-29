import { Component, OnInit } from '@angular/core';

import { UiHttp } from '../modules/index';

import { TabComponent } from './tab/tab';

@Component({
    selector: 'ui-test',
    templateUrl: 'app.html',
    styleUrls: ['./app.scss']
})
export class AppComponent implements OnInit {
    rootPage: any = TabComponent;
    date: string = '';

    constructor(private http: UiHttp) {
    }

    ngOnInit() {
        this.http.get('/test', {
            params: {
                a: '3'
            }
        }).then(response => {
            console.log(response);
        }, error => {
            console.log(error);
        });
    }
}
