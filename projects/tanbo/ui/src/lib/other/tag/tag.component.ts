import { Component, Input, Output, EventEmitter } from '@angular/core';

import { attrToBoolean } from '../../utils';

@Component({
  selector: 'ui-tag',
  templateUrl: './tag.component.html'
})
export class TagComponent {
  @Input()
  set closable(v: boolean) {
    this._closable = attrToBoolean(v);
  }

  get closable() {
    return this._closable;
  }

  @Output() uiClose = new EventEmitter<void>();

  private _closable = false;

  close() {
    this.uiClose.emit();
  }
}
