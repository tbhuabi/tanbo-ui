import { Directive, AfterViewInit, OnDestroy, Input, Optional, Self, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { InputGroupService } from '../input-group/input-group.service';

@Directive({
  selector: 'input[ui-input]',
  host: {
    '[class.ui-form-control]': 'true',
    '[class.ui-input-sm]': 'size === "sm"',
    '[class.ui-input-lg]': 'size === "lg"',
    '[class.ui-has-error]': 'hasError'
  }
})
export class InputDirective implements OnDestroy, AfterViewInit {
  @Input()
  autofocus: boolean;
  @Input()
  size: string;

  hasError = false;

  private subs: Subscription[] = [];

  constructor(@Optional() private inputGroupService: InputGroupService,
              @Self() @Optional() private ngControl: NgControl) {
  }

  @HostListener('focus')
  onFocus() {
    this.setFocusState(true);
  }

  @HostListener('blur')
  onBlur() {
    this.setFocusState(false);
  }

  ngAfterViewInit() {
    this.setFocusState(this.autofocus !== undefined && this.autofocus !== false);
    if (this.ngControl && this.inputGroupService) {
      this.subs.push(this.ngControl.valueChanges.subscribe(() => {
        if (this.ngControl.dirty) {
          this.hasError = this.ngControl.valid;
          this.inputGroupService.setErrorState(this.hasError);
        }
      }));
    }
  }

  ngOnDestroy() {
    this.subs.forEach(item => item.unsubscribe());
  }

  private setFocusState(state: boolean) {
    if (this.inputGroupService) {
      this.inputGroupService.setFocusState(state);
    }
  }
}