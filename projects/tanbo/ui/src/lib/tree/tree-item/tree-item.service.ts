import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class TreeItemService {
  expand: Observable<boolean>;
  private expandEvent = new Subject<boolean>();

  constructor() {
    this.expand = this.expandEvent.asObservable();
  }

  change(state: boolean) {
    this.expandEvent.next(state);
  }
}
