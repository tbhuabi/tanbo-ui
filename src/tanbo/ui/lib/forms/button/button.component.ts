import { Component, Input, Renderer2, ElementRef, HostBinding } from '@angular/core';

import { attrToBoolean } from '../../utils';

@Component({
  /* tslint:disable */
  selector: '[uiButton]',
  /* tslint:enable */
  templateUrl: './button.component.html',
  host: {
    '[class.ui-button]': 'true'
  }
})
export class ButtonComponent {
  @Input()
  @HostBinding('class.ui-loading')
  set loading(v: any) {
    this._loading = attrToBoolean(v);
    this.updateState();
  }

  get loading() {
    return this._loading;
  }

  private _loading = false;

  constructor(private renderer: Renderer2,
              private elementRef: ElementRef) {
  }

  updateState() {
    this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', this._loading);
  }
}