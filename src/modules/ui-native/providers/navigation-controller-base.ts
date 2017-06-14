import { NavController } from './navigation-controller';

import { ViewHost } from '../utils/views';
import { NavigationService } from '../services/navigation.service';
import { PageTransition } from './view-transition-animate';

export class NavControllerBase extends NavController {
    private readonly host: ViewHost;
    private readonly navigationService: NavigationService;
    private params: { [key: string]: any };

    constructor(host: ViewHost, navigationService: NavigationService) {
        super();
        this.host = host;
        this.navigationService = navigationService;
    }

    push(component: any, params?: { [key: string]: any }, transition?: PageTransition) {
        this.params = params;
        this.navigationService.publish(component, this.host, transition);
    }

    pop() {
        this.navigationService.pop(this.host);
    }

    getParam(key: string) {
        if (this.params) {
            return this.params[key];
        }
    }
}