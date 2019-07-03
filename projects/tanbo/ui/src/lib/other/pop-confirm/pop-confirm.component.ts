import { Component, EventEmitter, Output, OnDestroy, OnInit, ElementRef, Renderer2 } from '@angular/core';

import { TooltipBaseService } from '../tooltip-base/tooltip-base.service';

@Component({
  selector: 'ui-pop-confirm',
  templateUrl: './pop-confirm.component.html',
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
export class PopConfirmComponent implements OnInit, OnDestroy {
  @Output() uiConfirm = new EventEmitter<void>();
  @Output() uiCancel = new EventEmitter<void>();

  isShow = false;
  text = '';
  referenceElement: HTMLElement;

  get x() {
    return this.left + this.scrollX;
  }

  get y() {
    return this.top + this.scrollY;
  }

  position = 'topCenter';

  private left = 0;
  private top = 0;

  private scrollX = 0;
  private scrollY = 0;

  private unbindFn: () => any;

  constructor(private renderer: Renderer2,
              private tooltipBaseService: TooltipBaseService,
              private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.tooltipBaseService.push(this.elementRef);
  }

  ngOnDestroy() {
    if (this.unbindFn) {
      this.unbindFn();
    }
  }

  show() {
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
        this.top = distance.top + distance.height + 8;
        break;
      case 'bottomCenter':
        this.left = distance.left + distance.width / 2;
        this.top = distance.top + distance.height + 8;
        break;
      case 'bottomRight':
        this.left = distance.left + distance.width;
        this.top = distance.top + distance.height + 8;
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
  }

  hide() {
    this.isShow = false;
    if (this.unbindFn) {
      this.unbindFn();
    }
  }

  cancel() {
    this.hide();
    this.uiCancel.emit();
  }

  confirm() {
    this.hide();
    this.uiConfirm.emit();
  }
}
