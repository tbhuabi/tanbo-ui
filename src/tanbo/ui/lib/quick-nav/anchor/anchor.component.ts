import { Component, Input, HostListener, ElementRef } from '@angular/core';

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

  get href() {
    return location.pathname + '#' + this.id;
  }

  constructor(private elementRef: ElementRef,
              private anchorService: AnchorService) {
  }

  @HostListener('window:scroll')
  scroll() {
    const distance = this.elementRef.nativeElement.getBoundingClientRect();
    if (distance.top < 100) {
      this.anchorService.anchorIn(this.href);
    }
  }
}