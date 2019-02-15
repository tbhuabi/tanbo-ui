import { Component, Optional, OnInit, OnDestroy, HostBinding, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subscription } from 'rxjs';

import { NavItemService } from '../nav-item/nav-item.service';
import { NavService } from './nav.service';
import { attrToBoolean } from '../../utils';

@Component({
  selector: 'ui-nav',
  templateUrl: './nav.component.html',
  animations: [trigger('navAnimation', [state('open', style({
    height: '*',
    opacity: 1
  })), state('close', style({
    height: 0,
    opacity: 0.5,
    paddingTop: 0,
    paddingBottom: 0
  })), transition('open <=> close', animate(150))])],
  host: {
    '[@navAnimation]': 'isOpen ? "open" : "close"'
  },
  providers: [
    NavService
  ]
})
export class NavComponent implements OnDestroy, OnInit {
  @Input()
  @HostBinding('class.ui-thumbnail')
  set thumbnail(v: any) {
    this._thumbnail = attrToBoolean(v);
    this.navService.thumbnail.next(this._thumbnail);
  }

  get thumbnail() {
    return this._thumbnail;
  }


  @HostBinding('class.ui-open') isOpen = false;
  private _thumbnail = false;
  private sub: Subscription;

  constructor(@Optional() private navItemService: NavItemService,
              private navService: NavService) {
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