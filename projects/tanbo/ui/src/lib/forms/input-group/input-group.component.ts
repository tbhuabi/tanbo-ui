import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { InputGroupService } from './input-group.service';

@Component({
  selector: 'ui-input-group',
  templateUrl: './input-group.component.html',
  providers: [
    InputGroupService
  ]
})
export class InputGroupComponent implements OnDestroy, OnInit {
  subs: Subscription[] = [];
  hasError: boolean = false;
  isFocus: boolean = false;

  constructor(private inputGroupService: InputGroupService) {
  }

  ngOnInit() {
    this.subs.push(this.inputGroupService.hasError.subscribe(b => {
      this.hasError = b;
    }));
    this.subs.push(this.inputGroupService.isFocus.subscribe(b => {
      this.isFocus = b;
    }));
  }

  ngOnDestroy() {
    this.subs.forEach(item => item.unsubscribe());
  }
}