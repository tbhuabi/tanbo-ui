import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'ui-timeline-item',
  templateUrl: './timeline-item.component.html'
})
export class TimelineItemComponent {
  @Input()
  @HostBinding('class.ui-checked')
  checked: boolean;
}