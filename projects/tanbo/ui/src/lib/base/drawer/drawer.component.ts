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

  private isSelfClick = false;

  hide() {
    if (!this.isSelfClick) {
      this.uiHide.emit();
    }
    this.isSelfClick = false;
  }

  selfClick() {
    this.isSelfClick = true;
  }
}
