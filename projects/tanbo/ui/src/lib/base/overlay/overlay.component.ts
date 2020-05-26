import { Component, EventEmitter, Input, Output } from '@angular/core';

import { GourdBoolean } from '../../utils';

@Component({
  selector: 'ui-overlay',
  templateUrl: './overlay.component.html'
})
export class OverlayComponent {
  @Input() @GourdBoolean()
  show = false;

  @Output() uiHide = new EventEmitter<void>();

  done() {
    if (!this.show) {
      this.uiHide.emit();
    }
  }
}
