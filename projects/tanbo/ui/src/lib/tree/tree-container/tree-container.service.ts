import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class TreeContainerService {
  focusElement: Observable<HTMLElement>;
  hoverElement: Observable<HTMLElement>;
  private focusElementSource = new Subject<HTMLElement>();
  private hoverElementSource = new Subject<HTMLElement>();

  constructor() {
    this.focusElement = this.focusElementSource.asObservable();
    this.hoverElement = this.hoverElementSource.asObservable();
  }

  focus(element: HTMLElement) {
    this.focusElementSource.next(element);
  }

  hover(element: HTMLElement) {
    this.hoverElementSource.next(element);
  }
}