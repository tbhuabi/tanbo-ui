import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-overlay',
  templateUrl: './overlay.component.html'
})
export class OverlayComponent {
  @Input() show = false;
  @Output() uiHide = new EventEmitter<void>();

  done() {
    if (!this.show) {
      this.uiHide.emit();
    }
  }
}
