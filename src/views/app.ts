import { Component } from '@angular/core';

@Component({
    selector: 'ui-test',
    templateUrl: 'app.html',
    styleUrls: ['./app.scss']
})
export class AppComponent {
    html: string = '';

    show(str: string) {
        console.log(str);
    }
}
