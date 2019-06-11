import { Component, Optional, SkipSelf, OnDestroy, OnInit, HostBinding, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';

import { NavItemService } from './nav-item.service';
import { NavService } from '../nav/nav.service';

@Component({
  selector: 'ui-nav-item',
  templateUrl: './nav-item.component.html',
  providers: [
    NavItemService
  ]
})
export class NavItemComponent implements OnInit, OnDestroy {
  @HostBinding('class.ui-thumbnail')
  isThumbnail = false;
  private parentIsThumbnail = false;
  private subs: Subscription[] = [];

  constructor(@Optional() @SkipSelf() private parentNavItemService: NavItemService,
              private navService: NavService,
              private navItemService: NavItemService) {
  }

  ngOnInit() {
    if (this.navService.parent) {
      this.subs.push(this.navService.parent.thumbnail.subscribe(b => {
        this.parentIsThumbnail = b;
        if (b && this.parentNavItemService) {
          this.parentNavItemService.change(false);
        }
      }));
    }
    this.subs.push(this.navService.thumbnail.subscribe(b => {
      this.isThumbnail = b;
    }));
    this.subs.push(this.navItemService.isOpen.subscribe(b => {
      if (this.parentNavItemService && b && !this.parentIsThumbnail) {
        this.parentNavItemService.change(b);
      }
    }));
  }

  ngOnDestroy() {
    this.subs.forEach(item => item.unsubscribe());
  }

  @HostListener('mouseenter')
  mouseEnter() {
    if (this.isThumbnail) {
      this.navItemService.change(true);
    }
  }

  @HostListener('mouseleave')
  mouseLeave() {
    if (this.isThumbnail) {
      this.navItemService.change(false);
    }
  }
}