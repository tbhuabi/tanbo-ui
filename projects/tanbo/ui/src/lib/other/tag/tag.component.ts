import { Component, Input, Output, EventEmitter } from '@angular/core';

import { AttrBoolean } from '../../utils';

@Component({
  selector: 'ui-tag',
  templateUrl: './tag.component.html'
})
export class TagComponent {
  @Input() @AttrBoolean() closable = false;

  @Output() uiClose = new EventEmitter<void>();

  close() {
    this.uiClose.emit();
  }
}
