import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export type DropdownDisplayLimit = 'width' | 'minWidth' | 'maxWidth';

@Injectable()
export class DropdownService {
  menuClick: Observable<void>;
  displayLimit: Observable<DropdownDisplayLimit>;
  private menuClickSource = new Subject<void>();
  private displayLimitSource = new Subject<DropdownDisplayLimit>();

  constructor() {
    this.menuClick = this.menuClickSource.asObservable();
    this.displayLimit = this.displayLimitSource.asObservable();
  }

  click() {
    this.menuClickSource.next();
  }

  updateDisplayLimit(type: DropdownDisplayLimit) {
    this.displayLimitSource.next(type);
  }
}
