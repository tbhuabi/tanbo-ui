import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { Subscription } from 'rxjs';

import { InputGroupService } from '../input-group/input-group.service';

@Component({
  selector: 'ui-input-addon',
  templateUrl: './input-addon.component.html',
  host: {
    '[class.ui-has-error]': 'hasError',
  }
})
export class InputAddonComponent implements OnDestroy, OnInit {
  subs: Subscription[] = [];
  hasError: boolean = false;

  constructor(@Optional() private inputGroupService: InputGroupService) {
  }

  ngOnInit() {
    this.subs.push(this.inputGroupService.hasError.subscribe(b => {
      this.hasError = b;
    }));
  }

  ngOnDestroy() {
    this.subs.forEach(item => item.unsubscribe());
  }
}