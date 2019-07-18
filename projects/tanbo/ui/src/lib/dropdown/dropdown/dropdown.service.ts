import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class DropdownService {
  menuClick: Observable<void>;
  private menuClickSource = new Subject<void>();

  constructor() {
    this.menuClick = this.menuClickSource.asObservable();
  }

  click() {
    this.menuClickSource.next();
  }
}
