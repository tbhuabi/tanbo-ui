import { Component, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ui-dropdown',
  templateUrl: './dropdown.component.html',
  host: {
    '[class.ui-open]': 'open',
    '[class.ui-focus]': 'focus'
  }
})
export class DropdownComponent {
  @Input() autoDisplay = true;
  @Input() open = false;
  @Output() uiEscape = new EventEmitter();

  focus = false;
  private isSelfClick: boolean = false;

  @HostListener('document:click')
  docClick() {
    if (!this.isSelfClick) {
      if (this.autoDisplay) {
        this.open = false;
      }
      this.focus = false;
      this.uiEscape.emit();
    }
    this.isSelfClick = false;
  }

  @HostListener('click')
  click() {
    this.isSelfClick = true;
    this.focus = true;
    if (this.autoDisplay) {
      this.open = !this.open;
    }
  }
}