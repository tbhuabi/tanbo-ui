import { Component } from '@angular/core';

@Component({
    selector: 'ui-my-app',
    templateUrl: 'app.html'
})
export class AppComponent {
    open: boolean = false;
    data: any = {
        a: ''
    };
    dataList: Array<any> = [{
        key: 'name1',
        value: '000'
    }, {
        key: 'name2',
        value: '111'
    }, {
        key: 'name3',
        value: '333'
    }, {
        key: 'name4',
        value: '444'
    }, {
        key: 'name5',
        value: '666'
    }];
}
