import { Component, Optional, SkipSelf, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { NavItemService } from './nav-item.service';

@Component({
  selector: 'ui-nav-item',
  templateUrl: './nav-item.component.html',
  providers: [
    NavItemService
  ]
})
export class NavItemComponent implements OnInit, OnDestroy {
  private sub: Subscription;

  constructor(@Optional() @SkipSelf() private parentNavItemService: NavItemService,
              private navItemService: NavItemService) {
  }

  ngOnInit() {
    this.sub = this.navItemService.isOpen.subscribe(b => {
      if (this.parentNavItemService && b) {
        this.parentNavItemService.change(b);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}