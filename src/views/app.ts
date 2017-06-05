import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { transition, trigger, query, animate, style } from '@angular/animations';

@Component({
    selector: 'ui-test',
    templateUrl: 'app.html',
    styleUrls: ['./app.scss'],
    animations: [trigger('routerAnimations', [
        transition('ui-page1 => ui-page2', [
            query(':enter', [style({
                transform: 'translateX(100px)'
            }), animate(300, style({
                transform: 'translateX(0)'
            }))]),
            query(':leave', animate(300, style({
                transform: 'translateX(1100px)',
                opacity: .5
            })))
        ])
    ])]
})
export class AppComponent {
    constructor(public router: Router) {
    }

    prepareRouteAnimation(outlet: RouterOutlet) {
        // const animation = outlet.activatedRouteData['animation'];
        // console.log(animation);
        // // console.log(outlet);
        // return animation ? animation['value'] : null;
        return transition('ui-page1 => ui-page2', [
            query(':enter', [style({
                transform: 'translateX(100px)'
            }), animate(300, style({
                transform: 'translateX(0)'
            }))]),
            query(':leave', animate(300, style({
                transform: 'translateX(1100px)',
                opacity: .5
            })))
        ]);
    }
}
