import { Component, EventEmitter, HostBinding, HostListener, Input, Output, Attribute } from '@angular/core';
import { ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'ui-tab-button',
  templateUrl: './tab-button.component.html',
  host: {
    '[attr.tabindex]': 'tabIndex || 0'
  }
})
export class TabButtonComponent {
  @HostBinding('class.ui-active')
  @Input() active: boolean = false;
  @Output() uiSelected = new EventEmitter();

  /*tslint:disable*/
  constructor(@Attribute('tabindex') public tabIndex: string) {
  }
  /*tslint:enable*/

  @HostListener('keydown', ['$event'])
  keyDown(ev: KeyboardEvent) {
    if (ev.keyCode === ENTER) {
      this.click();
    }
  }

  @HostListener('click')
  click() {
    this.uiSelected.emit();
  }
}