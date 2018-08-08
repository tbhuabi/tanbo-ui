import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'ui-tab-view-item',
  templateUrl: './tab-view-item.component.html'
})
export class TabViewItemComponent {
  @HostBinding('class.ui-active')
  active = false;
}