import { Component, OnDestroy, OnInit, ElementRef, Renderer2 } from '@angular/core';

import { TooltipBaseService } from '../tooltip-base/tooltip-base.service';

@Component({
  selector: 'ui-tooltip',
  templateUrl: './tooltip.component.html',
  host: {
    '[class.ui-show]': 'isShow',
    '[class.ui-top-left]': 'position === "topLeft"',
    '[class.ui-top-center]': 'position === "topCenter"',
    '[class.ui-top-right]': 'position === "topRight"',
    '[class.ui-right-top]': 'position === "rightTop"',
    '[class.ui-right-center]': 'position === "rightCenter"',
    '[class.ui-right-bottom]': 'position === "rightBottom"',
    '[class.ui-bottom-left]': 'position === "bottomLeft"',
    '[class.ui-bottom-center]': 'position === "bottomCenter"',
    '[class.ui-bottom-right]': 'position === "bottomRight"',
    '[class.ui-left-top]': 'position === "leftTop"',
    '[class.ui-left-center]': 'position === "leftCenter"',
    '[class.ui-left-bottom]': 'position === "leftBottom"',
    '[style.top]': 'y + "px"',
    '[style.left]': 'x + "px"'
  }
})
export class TooltipComponent implements OnInit, OnDestroy {
  isShow = false;
  text = '';
  referenceElement: HTMLElement;

  position: string = 'topCenter';

  get x() {
    return this.left + this.scrollX;
  }

  get y() {
    return this.top + this.scrollY;
  }

  private left: number = 0;
  private top: number = 0;

  private scrollX: number = 0;
  private scrollY: number = 0;

  private unbindFn: () => any;

  private timer: any = null;

  constructor(private renderer: Renderer2,
              private tooltipBaseService: TooltipBaseService,
              private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.tooltipBaseService.push(this.elementRef);
  }

  ngOnDestroy() {
    clearTimeout(this.timer);
    if (this.unbindFn) {
      this.unbindFn();
    }
  }

  show() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      const distance = this.referenceElement.getBoundingClientRect();
      switch (this.position) {
        case 'topLeft':
          this.left = distance.left;
          this.top = distance.top - 6;
          break;
        case 'topRight':
          this.left = distance.left + distance.width;
          this.top = distance.top - 6;
          break;
        case 'rightTop':
          this.left = distance.left + distance.width + 10;
          this.top = distance.top;
          break;
        case 'rightCenter':
          this.left = distance.left + distance.width + 10;
          this.top = distance.top + distance.height / 2;
          break;
        case 'rightBottom':
          this.left = distance.left + distance.width + 10;
          this.top = distance.top + distance.height;
          break;
        case 'bottomLeft':
          this.left = distance.left;
          this.top = distance.top + distance.height + 6;
          break;
        case 'bottomCenter':
          this.left = distance.left + distance.width / 2;
          this.top = distance.top + distance.height + 6;
          break;
        case 'bottomRight':
          this.left = distance.left + distance.width;
          this.top = distance.top + distance.height + 6;
          break;
        case 'leftTop':
          this.left = distance.left - 6;
          this.top = distance.top;
          break;
        case 'leftCenter':
          this.left = distance.left - 6;
          this.top = distance.top + distance.height / 2;
          break;
        case 'leftBottom':
          this.left = distance.left - 6;
          this.top = distance.top + distance.height;
          break;
        default:
          this.position = 'topCenter';
          this.left = distance.left + distance.width / 2;
          this.top = distance.top - 6;
      }
      this.scrollX = window.scrollX;
      this.scrollY = window.scrollY;

      this.unbindFn = this.renderer.listen('window', 'scroll', () => {
        this.scrollX = window.scrollX;
        this.scrollY = window.scrollY;
      });
      this.isShow = true;
    }, 150);
  }

  hide() {
    clearTimeout(this.timer);
    if (this.unbindFn) {
      this.unbindFn();
    }
    this.timer = setTimeout(() => {
      this.isShow = false;
    }, 100);
  }
}
