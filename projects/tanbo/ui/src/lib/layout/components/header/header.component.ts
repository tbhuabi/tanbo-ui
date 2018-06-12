import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'ui-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Input()
  @HostBinding('class.ui-fill-screen')
  fillScreenWidth = true;
  @Input()
  fluid = false;
}