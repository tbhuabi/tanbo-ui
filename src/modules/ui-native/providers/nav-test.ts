import { NavController } from './navigation-controller';

import { RouterOutLetComponent } from '../components/router-outlet/router-outlet.component';
import { NavigationService } from '../services/navigation.service';

export class NavTest extends NavController {
    private host: RouterOutLetComponent;
    private navigationService: NavigationService;
    constructor(host: RouterOutLetComponent, navigationService: NavigationService) {
        super();
        this.host = host;
        this.navigationService = navigationService;
    }

    push(component: any, params?: any) {
        this.navigationService.publish(component, this.host);
    }

    pop() {
        this.navigationService.pop(this.host);
    }
}