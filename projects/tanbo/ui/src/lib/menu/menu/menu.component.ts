import { Component, Optional, OnInit, OnDestroy, SkipSelf, HostBinding } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subscription } from 'rxjs';

import { MenuItemService } from '../menu-item/menu-item.service';
import { UI_MENU_DEPTH } from '../config';

@Component({
  selector: 'ui-menu',
  templateUrl: './menu.component.html',
  providers: [{
    provide: UI_MENU_DEPTH,
    useFactory(depth: number) {
      return depth + 1;
    },
    deps: [[UI_MENU_DEPTH, new SkipSelf()]]
  }],
  animations: [trigger('menuAnimation', [state('open', style({
    height: '*'
  })), state('close', style({
    height: 0
  })), transition('open <=> close', animate(200))])],
  host: {
    '[@menuAnimation]': 'isOpen ? "open" : "close"'
  }
})
export class MenuComponent implements OnDestroy, OnInit {
  @HostBinding('class.ui-open')
  isOpen = false;

  private sub: Subscription;

  constructor(@Optional() private menuItemService: MenuItemService) {
  }

  ngOnInit() {
    if (this.menuItemService) {
      this.menuItemService.publishMenu(true);
      this.sub = this.menuItemService.isOpen.subscribe(b => {
        this.isOpen = b;
      });
    } else {
      this.isOpen = true;
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.menuItemService.publishMenu(false);
      this.sub.unsubscribe();
    }
  }
}