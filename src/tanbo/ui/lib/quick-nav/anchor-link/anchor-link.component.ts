import { Component, OnInit, OnDestroy, Input, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

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
  @Input()
  fragment = '';
  @HostBinding('class.ui-active')
  isActive = false;

  private sub: Subscription;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.activatedRoute.fragment.subscribe(str => {
      this.isActive = str === this.fragment;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}