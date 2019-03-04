import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class NavItemService {
  isOpen: Observable<boolean>;
  hasMenu: Observable<boolean>;
  private openEvent = new BehaviorSubject<boolean>(false);
  private hasMenuEvent = new BehaviorSubject<boolean>(false);

  constructor(@Optional() @SkipSelf() public parent: NavItemService) {
    this.isOpen = this.openEvent.asObservable();
    this.hasMenu = this.hasMenuEvent.asObservable();
  }

  change(state: boolean) {
    this.openEvent.next(state);
  }

  publishMenu(b: boolean) {
    this.hasMenuEvent.next(b);
  }
}