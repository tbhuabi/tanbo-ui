import { Component, EventEmitter, Input, Output } from '@angular/core';
import { attrToBoolean } from '../../utils';

@Component({
  selector: 'ui-overlay',
  templateUrl: './overlay.component.html'
})
export class OverlayComponent {
  @Input()
  set show(v: boolean) {
    this._show = attrToBoolean(v);
  }

  get show() {
    return this._show;
  }

  @Output() uiHide = new EventEmitter<void>();

  private _show = false;

  done() {
    if (!this.show) {
      this.uiHide.emit();
    }
  }
}
