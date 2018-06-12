import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'ui-container',
  templateUrl: './container.component.html'
})
export class ContainerComponent {
  @Input()
  @HostBinding('class.ui-not-fill')
  fill = false;
}