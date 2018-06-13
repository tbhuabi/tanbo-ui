import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'ui-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Input()
  fillScreenWidth = true;
  @Input()
  fluid = false;
  @Input()
  @HostBinding('class.ui-header-fixed')
  fixed = false;

  @HostBinding('class.ui-header-fill-screen')
  get _fillScreen() {
    return !this.fillScreenWidth;
  }
}