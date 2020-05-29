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
    '-ms-transform': transformMap[direction],
    transform: transformMap[direction],
  };
}

@Component({
  selector: 'ui-drawer',
  templateUrl: './drawer.component.html'
})

export class DrawerComponent {
  @Input()
  direction = 'bottom';

  @Input()
  get show() {
    return this._show;
  }

  set show(val: boolean) {
    if (val && this.canExecuteNextAnimate && !this.isFirstLoad) {
      this.canExecuteNextAnimate = false;
      let i = 0;
      let step = 0;
      const max = 20;
      this.overlayShow = val;
      this.styles = createStyles(0, this.direction);
      this._show = val;
      const fn = () => {
        step = this.cubicBezier.update(i / max);
        this.styles = createStyles(step, this.direction);
        i++;
        if (i <= max) {
          this.animationId = requestAnimationFrame(fn);
        } else {
          this.canExecuteNextAnimate = true;
        }
      };
      this.animationId = requestAnimationFrame(fn);
    } else if (!val && this.canExecuteNextAnimate && !this.isFirstLoad) {
      this.canExecuteNextAnimate = false;
      let j = 20;
      let step = 0;
      const fn = () => {
        step = this.cubicBezier.update(j / 20);
        this.styles = createStyles(step, this.direction);
        j--;
        if (j >= 0) {
          this.animationId = requestAnimationFrame(fn);
        } else {
          this.canExecuteNextAnimate = true;
          this._show = val;
          this.overlayShow = val;
          cancelAnimationFrame(this.animationId);
        }
      };
      fn();
    }
    this.isFirstLoad = false;
  }

  @Output()
  uiHide = new EventEmitter();
  styles: { [key: string]: string | number } = {};
  overlayShow = false;

  private cubicBezier = new CubicBezier(0.36, 0.66, 0.04, 1);
  private animationId: number;
  private _show = false;
  private isSelfClick = false;
  private isFirstLoad = true;
  private canExecuteNextAnimate = true;

  hide() {
    if (!this.isSelfClick && this.canExecuteNextAnimate) {
      this.uiHide.emit();
    }
    this.isSelfClick = false;
  }

  selfClick() {
    this.isSelfClick = true;
  }
}
