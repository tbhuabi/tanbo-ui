import { Component, Optional, OnInit, OnDestroy, SkipSelf, HostBinding } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subscription } from 'rxjs';

import { NavItemService } from '../nav-item/nav-item.service';
import { UI_NAV_DEPTH } from '../config';

@Component({
  selector: 'ui-nav',
  templateUrl: './nav.component.html',
  providers: [{
    provide: UI_NAV_DEPTH,
    useFactory(depth: number) {
      return depth + 1;
    },
    deps: [[UI_NAV_DEPTH, new SkipSelf()]]
  }],
  animations: [trigger('navAnimation', [state('open', style({
    height: '*'
  })), state('close', style({
    height: 0
  })), transition('open <=> close', animate(200))])],
  host: {
    '[@navAnimation]': 'isOpen ? "open" : "close"'
  }
})
export class NavComponent implements OnDestroy, OnInit {
  @HostBinding('class.ui-open')
  isOpen = false;

  private sub: Subscription;

  constructor(@Optional() private navItemService: NavItemService) {
  }

  ngOnInit() {
    if (this.navItemService) {
      this.navItemService.publishMenu(true);
      this.sub = this.navItemService.isOpen.subscribe(b => {
        this.isOpen = b;
      });
    } else {
      this.isOpen = true;
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.navItemService.publishMenu(false);
      this.sub.unsubscribe();
    }
  }
}