import { Component } from '@angular/core';
import { NavController } from '../../../../modules/index';
import { Child2Component } from '../child2/child2';

@Component({
    templateUrl: './child.html'
})
export class ChildComponent {
    constructor(private nav: NavController) {
    }

    toPage() {
        this.nav.push(Child2Component);
    }
}