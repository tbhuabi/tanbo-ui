import { Component, OnInit, OnDestroy, Input, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs';

import { AnchorService } from '../index';

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
  @Input('ui-anchor-link')
  targetId = '';
  @HostBinding('class.ui-active')
  get isActive() {
    if (this.url) {
      return this.url === this.href;
    }
    return location.pathname + location.hash === this.href;
  }
  @HostBinding('href')
  get href() {
    return location.pathname + '#' + this.targetId;
  }

  private sub: Subscription;
  private url = '';

  constructor(private anchorService: AnchorService) {
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