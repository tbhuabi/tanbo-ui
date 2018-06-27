import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-modal',
  templateUrl: './modal.component.html',
  host: {
    '[class.ui-modal-lg]': 'size === "lg"',
    '[class.ui-modal-sm]': 'size === "sm"'
  }
})
export class ModalComponent {
  @Input()
  size = '';
}