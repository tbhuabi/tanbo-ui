import { Component, EventEmitter, Input, Output } from '@angular/core';
import { attrToBoolean } from '../../utils';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'ui-overlay',
  templateUrl: './overlay.component.html',
  animations: [
    trigger('overlayAnimation', [
      state('*', style({
        opacity: 1
      })),
      transition(':enter', [
        style({opacity: 0}),
        animate(300, style({opacity: 1})),
      ]),
      transition(':leave', [
        animate(300, style({opacity: 0}))
      ])
    ])
  ]
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
