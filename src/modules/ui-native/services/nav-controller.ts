import { Injectable } from '@angular/core';

import { NavControllerService } from './nav-controller.service';

@Injectable()
export class NavController {
    private params: any;

    constructor(private navControllerService: NavControllerService) {
    };

    push(component: any, params?: { [key: string]: any }) {
        this.params = params;
        this.navControllerService.publish(component);
    }

    pop() {
        this.navControllerService.pop();
    }

    getParam(key: string) {
        if (this.params) {
            return this.params[key];
        }
    }
}