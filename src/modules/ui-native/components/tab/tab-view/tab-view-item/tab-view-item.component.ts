import { Component, HostBinding, Input, ViewChild, AfterViewInit } from '@angular/core';

import { NavigationService } from '../../../../services/navigation.service';
import { ViewsComponent } from '../../../views/views.component';

@Component({
    selector: 'ui-tab-view-item',
    templateUrl: './tab-view-item.component.html'
})
export class TabViewItemComponent implements AfterViewInit {
    @ViewChild(ViewsComponent)
    host: ViewsComponent;
    @Input()
    rootPage: any;

    @HostBinding('class.active')
    isActive: boolean = false;

    constructor(private navControllerService: NavigationService) {
    }

    ngAfterViewInit() {
        this.navControllerService.publish(this.rootPage, this.host);
    }
}