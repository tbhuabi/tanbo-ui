import { Injectable, Optional, SkipSelf } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class NavService {
  thumbnail = new BehaviorSubject<boolean>(false);

  constructor(@Optional() @SkipSelf() public parent: NavService) {
  }
}