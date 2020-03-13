import { Component, EventEmitter, Input, Output } from '@angular/core';
import { drawerAnimation } from './drawer-animation';

@Component({
  selector: 'ui-drawer',
  templateUrl: './drawer.component.html',
  animations: [
    drawerAnimation
  ]
})
export class DrawerComponent {
  @Input()
  direction = 'bottom';
  @Input()
  show = false;

  @Output()
  uiHide = new EventEmitter();

  hide() {
    this.uiHide.emit();
  }
}
