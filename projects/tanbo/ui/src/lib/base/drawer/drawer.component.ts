import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CubicBezier } from '@tanbo/bezier';

function createStyles(step: number, direction: string) {

  const transformMap = {
    left: `translateX(${(step - 1) * 100}%)`,
    right: `translateX(${(1 - step) * 100}%)`,
    top: `translateY(${(step - 1) * 100}%)`,
    bottom: `translateY(${(1 - step) * 100}%)`,
  };

  return {
    left: direction === 'right' ? 'none' : 0,
    right: direction === 'left' ? 'none' : 0,
    top: direction === 'bottom' ? 'none' : 0,
    bottom: direction === 'top' ? 'none' : 0,
    opacity: step,
    transform: transformMap[direction],
    '-ms-transform': transformMap[direction],
  };
}

@Component({
  selector: 'ui-drawer',
  templateUrl: './drawer.component.html'
})

export class DrawerComponent {
  @ViewChild('drawer', {static: false}) drawer: ElementRef;
  @Input()
  direction = 'bottom';

  @Input()
  get show() {
    return this._show;
  }

  set show(val: boolean) {
    if (this._show) {
      let j = 16;
      let step = 0;
      const fn = () => {
        step = this.cubicBezier.update(j / 16);
        this.styles = createStyles(step, this.direction);
        j--;
        if (j >= 0) {
          this.animationId = requestAnimationFrame(fn);
        } else {
          this._show = val;
          cancelAnimationFrame(this.animationId);
        }
      };
      fn();
    } else {
      let i = 0;
      let step = 0;
      const max = 16;
      this.styles = createStyles(0, this.direction);
      const fn = () => {
        step = this.cubicBezier.update(i / max);
        this.styles = createStyles(step, this.direction);
        i++;
        if (i <= max) {
          this.animationId = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(this.animationId);
        }
      };
      this.animationId = requestAnimationFrame(() => {
        fn();
      });
      this._show = val;
    }
  }

  private cubicBezier = new CubicBezier(0.36, 0.66, 0.04, 1);
  private _show = false;
  private animationId: number;

  styles: { [key: string]: string | number } = {};

  @Output()
  uiHide = new EventEmitter();

  private isSelfClick = false;

  hide() {
    if (!this.isSelfClick) {
      this.uiHide.emit();
    }
    this.isSelfClick = false;
  }

  selfClick() {
    this.isSelfClick = true;
  }
}
