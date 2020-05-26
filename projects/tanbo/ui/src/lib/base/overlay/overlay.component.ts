import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CubicBezier } from '@tanbo/bezier';

import { GourdBoolean } from '../../utils';

@Component({
  selector: 'ui-overlay',
  templateUrl: './overlay.component.html'
})
export class OverlayComponent implements OnChanges {
  @Input() @GourdBoolean()
  show = false;

  @Output() uiHide = new EventEmitter<void>();

  opacity = 0;

  private animationId = null;
  private timer = null;
  private bezier = new CubicBezier(0.25, 0.1, 0.25, 1);

  done() {
    if (!this.show) {
      this.uiHide.emit();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    Object.keys(changes).forEach(key => {
      if (key === 'show') {
        if (this.show) {
          this.animateStart((n: number) => {
            this.opacity = n;
          });
        } else {
          this.timer = setTimeout(() => {
            this.animateStart((n: number) => {
              this.opacity = 1 - n;
              if (this.opacity === 0) {
                this.done();
              }
            });
          }, 300);
        }
      }
    });
  }

  private animateStart(fn: (n: number) => void) {
    const steps = 30;
    let i = 0;
    cancelAnimationFrame(this.animationId);
    const update = () => {
      fn(this.bezier.update(i / 30));
      if (i < steps) {
        this.animationId = requestAnimationFrame(update);
      }
      i++;
    };
    this.animationId = requestAnimationFrame(update);
  }
}
