import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class TabService {
  tabIndex: Observable<number>;
  private tabIndexSource = new BehaviorSubject<number>(0);

  constructor() {
    this.tabIndex = this.tabIndexSource.asObservable();
  }

  publishIndex(index: number) {
    this.tabIndexSource.next(index);
  }
}
