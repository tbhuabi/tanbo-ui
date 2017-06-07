import { NavController } from './navigation-controller';

import { RouterOutLetComponent } from '../components/router-outlet/router-outlet.component';
import { NavigationService } from '../services/navigation.service';

export class NavControllerBase extends NavController {
    private host: RouterOutLetComponent;
    private navigationService: NavigationService;
    private params: any;

    constructor(host: RouterOutLetComponent, navigationService: NavigationService) {
        super();
        this.host = host;
        this.navigationService = navigationService;
    }

    push(component: any, params?: any) {
        this.params = params;
        this.navigationService.publish(component, this.host);
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