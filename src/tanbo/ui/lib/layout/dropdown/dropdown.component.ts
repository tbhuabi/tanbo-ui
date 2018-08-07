import { Component, HostListener, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ui-dropdown',
  templateUrl: './dropdown.component.html',
  host: {
    '[class.ui-open]': 'open'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownComponent {
  @Input()
  autoDisplay = true;

  @Input()
  open = false;

  @Output()
  uiEscape = new EventEmitter();

  private isSelfClick: boolean = false;

  @HostListener('document:click')
  docClick() {
    if (!this.isSelfClick) {
      if (this.autoDisplay) {
        this.open = false;
      }
      this.uiEscape.emit();
    }
    this.isSelfClick = false;
  }

  @HostListener('click')
  click() {
    this.isSelfClick = true;
    if (this.autoDisplay) {
      this.open = !this.open;
    }
  }
}