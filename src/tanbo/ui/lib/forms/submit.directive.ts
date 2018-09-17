import { Directive, Optional, Host, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm, FormControl, FormGroup, FormArray, ControlContainer, FormGroupDirective } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  /*tslint:disable*/
  selector: '[uiSubmit]'
  /*tslint:enable*/
})
export class SubmitDirective implements OnInit, OnDestroy {

  @Output()
  uiSubmit = new EventEmitter<any>();

  private sub: Subscription;

  constructor(@Host() @Optional() private controlContainer: ControlContainer) {
  }

  ngOnInit() {
    if (this.controlContainer instanceof FormGroupDirective || this.controlContainer instanceof NgForm) {
      const group = this.controlContainer.form;
      this.sub = this.controlContainer.ngSubmit.subscribe((ev: Event) => {
        if (!this.controlContainer.valid) {
          this.markAsTouched(group);
        } else {
          this.uiSubmit.emit(ev);
        }
      });
    }

  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private markAsTouched(group: FormGroup | FormArray) {
    Object.keys(group.controls).map((field) => {
      const control = group.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({onlySelf: true});
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.markAsTouched(control);
      }
    });
  }
}