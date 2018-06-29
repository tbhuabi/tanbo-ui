import { Component, Inject, EventEmitter, Output, OnDestroy, OnInit, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { getPosition } from '../helper';

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
    '[style.top]': 'top + "px"',
    '[style.left]': 'left + "px"'
  }
})
export class PopConfirmComponent implements OnInit, OnDestroy {
  @Output()
  uiConfirm = new EventEmitter<void>();

  @Output()
  uiCancel = new EventEmitter<void>();

  isShow = false;
  text = '';
  referenceElement: HTMLElement;
  left: number;
  top: number;

  position: string = 'topCenter';

  constructor(@Inject(DOCUMENT) private document: any,
              private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.document.body.appendChild(this.elementRef.nativeElement);
  }

  ngOnDestroy() {
    this.document.body.removeChild(this.elementRef.nativeElement);
  }

  show() {
    const distance = getPosition(this.referenceElement);
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

    this.isShow = true;
  }

  hide() {
    this.isShow = false;
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