import { Component, EventEmitter, Input, Output } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { GourdBoolean } from '../../utils';

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
        animate('300ms 200ms', style({opacity: 0}))
      ])
    ])
  ]
})
export class OverlayComponent {
  @Input() @GourdBoolean()
  show = false;

  @Output() uiHide = new EventEmitter<void>();

  done() {
    if (!this.show) {
      this.uiHide.emit();
    }
  }
}
