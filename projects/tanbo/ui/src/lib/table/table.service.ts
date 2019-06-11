import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class TableService {
  onPush: Observable<any>;
  onDelete: Observable<any>;
  onChecked: Observable<any[]>;

  private pushEvent = new Subject<any>();
  private deleteEvent = new Subject<any>();
  private checkedEvent = new Subject<any[]>();

  constructor() {
    this.onPush = this.pushEvent.asObservable();
    this.onDelete = this.deleteEvent.asObservable();
    this.onChecked = this.checkedEvent.asObservable();
  }

  push(value: any) {
    this.pushEvent.next(value);
  }

  delete(value: any) {
    this.deleteEvent.next(value);
  }

  checked(results: any[]) {
    this.checkedEvent.next(results);
  }
}