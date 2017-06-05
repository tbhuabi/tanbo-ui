import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'ui-tab-view-item',
    templateUrl: './tab-view-item.component.html'
})
export class TabViewItemComponent {
    @HostBinding('class.active')
    @Input()
    isActive: boolean = false;
}