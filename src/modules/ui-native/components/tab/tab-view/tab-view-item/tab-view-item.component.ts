import { Component, HostBinding, Input, AfterViewInit } from '@angular/core';

import { NavControllerService } from '../../../../services/nav-controller.service';

@Component({
    selector: 'ui-tab-view-item',
    templateUrl: './tab-view-item.component.html'
})
export class TabViewItemComponent implements AfterViewInit {
    @Input()
    set rootPage(component: any) {
        this.component = component;
    };

    @HostBinding('class.active')
    isActive: boolean = false;

    private component: any;

    constructor(private navControllerService: NavControllerService) {
    }

    ngAfterViewInit() {
        if (this.component) {
            this.navControllerService.publish(this.component);
        }
    }
}