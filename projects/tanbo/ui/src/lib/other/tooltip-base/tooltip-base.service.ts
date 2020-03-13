import { Injectable, ElementRef } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TooltipBaseService {
  onPush: Observable<ElementRef>;

  private pushEvent = new Subject<ElementRef>();

  constructor() {
    this.onPush = this.pushEvent.asObservable();
  }

  push(element: ElementRef) {
    this.pushEvent.next(element);
  }
}
