import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class TreeItemService {
  isOpen: Observable<boolean>;
  private openEvent = new Subject<boolean>();

  constructor() {
    this.isOpen = this.openEvent.asObservable();
  }

  change(state: boolean) {
    this.openEvent.next(state);
  }
}