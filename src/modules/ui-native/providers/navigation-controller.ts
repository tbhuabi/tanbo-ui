import { Injectable } from '@angular/core';

import { NavigationService } from '../services/navigation.service';

@Injectable()
export class NavController {
    private params: any;
    // abstract push(component: any, params?: { [key: string]: any }) : void;

    constructor(public navigationService: NavigationService) {
    }

    push(component: any, params?: { [key: string]: any }) {
        this.params = params;
        this.navigationService.publish(component);
    }

    pop() {
        this.navigationService.pop();
    }

    getParam(key: string) {
        if (this.params) {
            return this.params[key];
        }
    }
}