import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'ui-container',
  templateUrl: './container.component.html'
})
export class ContainerComponent {
  @Input()
  fluid = false;

  @HostBinding('class.ui-not-fill')
  get _fluid() {
    return !this.fluid;
  }
}