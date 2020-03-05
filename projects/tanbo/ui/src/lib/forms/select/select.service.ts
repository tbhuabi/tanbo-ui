import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

import { OptionComponent } from '../option/option.component';

@Injectable()
export class SelectService {
  onChecked: Observable<OptionComponent>;
  isMultiple: Observable<boolean>;

  private checkedSource = new Subject<OptionComponent>();
  private multipleSource = new BehaviorSubject(false);

  constructor() {
    this.onChecked = this.checkedSource.asObservable();
    this.isMultiple = this.multipleSource.asObservable();
  }

  checked(option: OptionComponent) {
    this.checkedSource.next(option);
  }

  canMultiple(b: boolean) {
    this.multipleSource.next(b);
  }
}
