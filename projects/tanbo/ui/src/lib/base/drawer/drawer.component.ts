import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-drawer',
  templateUrl: './drawer.component.html'
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
