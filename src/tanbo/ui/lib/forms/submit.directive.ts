import { Directive, Optional, Self, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm, FormControl, FormGroup, FormArray } from '@angular/forms';

@Directive({
  /*tslint:disable*/
  selector: '[uiSubmit]'
  /*tslint:enable*/
})
export class SubmitDirective implements OnInit {

  @Output()
  uiSubmit = new EventEmitter<any>();

  constructor(@Self() @Optional() private ngForm: NgForm) {
  }

  ngOnInit() {
    const group = this.ngForm.form;
    this.ngForm.ngSubmit.subscribe((ev: Event) => {
      if (!this.ngForm.valid) {
        this.markAsTouched(group);
      } else {
        this.uiSubmit.emit(ev);
      }
    });
  }

  private markAsTouched(group: FormGroup | FormArray) {
    Object.keys(group.controls).map((field) => {
      const control = group.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.markAsTouched(control);
      }
    });
  }
}