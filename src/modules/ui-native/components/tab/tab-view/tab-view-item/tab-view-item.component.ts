import { Component, HostBinding, Input, ViewChild } from '@angular/core';

import { NavControllerService } from '../../../../services/nav-controller.service';
import { RouterOutLetComponent } from '../../../router-outlet/router-outlet.component';

@Component({
    selector: 'ui-tab-view-item',
    templateUrl: './tab-view-item.component.html'
})
export class TabViewItemComponent {
    @ViewChild(RouterOutLetComponent)
    host: RouterOutLetComponent;
    @Input()
    rootPage: any;

    @HostBinding('class.active')
    set isActive(b: boolean) {
        this._isActive = b;
        if (b) {
            this.navControllerService.setActivateView(this.host);
        }
    }

    get isActive() {
        return this._isActive;
    }

    private _isActive: boolean = false;

    constructor(private navControllerService: NavControllerService) {
    }

}