import { Component } from '@angular/core';

@Component({
    selector: 'ui-my-app',
    templateUrl: 'app.html'
})
export class AppComponent {
    data: any = {a: '1'};
    list: Array<string> = ['1', '2', '3'];

    submit() {
        console.log(this.data);
    }
}
