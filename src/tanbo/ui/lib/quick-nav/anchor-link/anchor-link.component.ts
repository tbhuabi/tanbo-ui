import { Component, ElementRef, HostBinding, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AnchorService } from '../index'

@Component({
  /*tslint:disable*/
  selector: 'a[ui-anchor-link]',
  /*tslint:enable*/
  templateUrl: './anchor-link.component.html',
  host: {
    '[class.ui-anchor-link]': 'true'
  }
})
export class AnchorLinkComponent implements OnInit, OnDestroy {
  @ViewChild('link', {read: ElementRef})
  linkEleRef: ElementRef;

  @HostBinding('class.ui-active')
  get isActive() {
    if (this.url) {
      return this.url === this.elementRef.nativeElement.href;
    }
    return window.location.href === this.elementRef.nativeElement.href;
  }

  private sub: Subscription;
  private url = '';

  constructor(private elementRef: ElementRef,
              private anchorService: AnchorService) {
  }

  ngOnInit() {
    this.sub = this.anchorService.onAnchorInScreen.subscribe(url => {
      this.url = url;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}