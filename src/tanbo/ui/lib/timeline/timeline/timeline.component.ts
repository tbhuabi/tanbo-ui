import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'ui-timeline',
  templateUrl: './timeline.component.html'
})
export class TimelineComponent {
  @Input()
  @HostBinding('class.ui-kebab')
  kebab = false;
}