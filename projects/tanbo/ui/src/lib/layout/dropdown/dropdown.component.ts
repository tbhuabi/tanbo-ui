import { Component, HostListener, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ui-dropdown',
  templateUrl: './dropdown.component.html',
  host: {
    '[class.ui-open]': 'open'
  }
})
export class DropdownComponent {
  open: boolean = false;

  @Output()
  escape = new EventEmitter();

  private isSelfClick: boolean = false;

  @HostListener('document:click')
  docClick() {
    if (!this.isSelfClick) {
      this.escape.emit();
      this.open = false;
    }
    this.isSelfClick = false;
  }

  @HostListener('click')
  click() {
    this.isSelfClick = true;
    this.open = !this.open;
  }
}