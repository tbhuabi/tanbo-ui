import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class InputGroupService {
  isFocus: Observable<boolean>;
  hasError: Observable<boolean>;

  private focusEvent = new Subject<boolean>();
  private errorEvent = new Subject<boolean>();

  constructor() {
    this.isFocus = this.focusEvent.asObservable();
    this.hasError = this.errorEvent.asObservable();
  }

  /**
   * @internal
   */
  setFocusState(isFocus: boolean) {
    this.focusEvent.next(isFocus);
  }

  /**
   * @internal
   */
  setErrorState(state: boolean) {
    this.errorEvent.next(state);
  }
}