import { Component, Input, HostListener, ElementRef, ViewChild } from '@angular/core';

import { AnchorService } from './anchor.service';

@Component({
  /*tslint:disable*/
  selector: '[ui-anchor]',
  /*tslint:enable*/
  templateUrl: './anchor.component.html',
  host: {
    '[class.ui-anchor]': 'true'
  }
})
export class AnchorComponent {
  @Input()
  id = '';

  @ViewChild('link', {read: ElementRef})
  linkEleRef: ElementRef;

  constructor(private elementRef: ElementRef,
              private anchorService: AnchorService) {
  }

  @HostListener('window:scroll')
  scroll() {
    const distance = this.elementRef.nativeElement.getBoundingClientRect();
    if (distance.top < 100) {
      this.anchorService.anchorIn(this.linkEleRef.nativeElement.href);
    }
  }
}