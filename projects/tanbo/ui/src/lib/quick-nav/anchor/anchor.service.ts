import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable()
export class AnchorService {
  onAnchorInScreen: Observable<string>;

  private eventSource = new Subject<string>();

  constructor() {
    this.onAnchorInScreen = this.eventSource.asObservable().pipe(distinctUntilChanged());
  }

  anchorIn(url: string) {
    this.eventSource.next(url);
  }
}