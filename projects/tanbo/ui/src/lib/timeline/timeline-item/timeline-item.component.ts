import { Component, Input, HostBinding } from '@angular/core';

import { AttrBoolean } from '../../utils';

@Component({
  selector: 'ui-timeline-item',
  templateUrl: './timeline-item.component.html'
})
export class TimelineItemComponent {
  @Input() @HostBinding('class.ui-checked') @AttrBoolean() checked = false;
}
