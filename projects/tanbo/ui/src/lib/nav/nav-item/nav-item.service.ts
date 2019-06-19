import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class NavItemService {
  expand: Observable<boolean>;
  hasMenu: Observable<boolean>;
  linksActive: Observable<boolean>;
  private openEvent = new BehaviorSubject<boolean>(false);
  private hasMenuEvent = new BehaviorSubject<boolean>(false);
  private linksActiveEvent = new Subject<boolean>();

  constructor(@Optional() @SkipSelf() private parent: NavItemService) {
    this.expand = this.openEvent.asObservable();
    this.hasMenu = this.hasMenuEvent.asObservable();
    this.linksActive = this.linksActiveEvent.asObservable();
  }

  changeExpandStatus(state: boolean) {
    this.openEvent.next(state);
  }

  publishLinkActiveStatus(b: boolean) {
    this.linksActiveEvent.next(b);
  }

  expandParent() {
    if (this.parent) {
      this.parent.changeExpandStatus(true);
    }
  }

  publishMenu(b: boolean) {
    this.hasMenuEvent.next(b);
  }
}
