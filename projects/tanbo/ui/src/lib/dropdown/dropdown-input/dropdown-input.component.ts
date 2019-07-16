import { Component, Input, Inject, Output, EventEmitter, HostListener, ElementRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ENTER, TAB } from '@angular/cdk/keycodes';

import { UI_DROPDOWN_ARROW_CLASSNAME } from '../help';
import { attrToBoolean } from '../../utils';

@Component({
  selector: 'ui-dropdown-input',
  templateUrl: './dropdown-input.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: DropdownInputComponent,
    multi: true
  }]
})
export class DropdownInputComponent implements ControlValueAccessor {
  @ViewChild('rawInput', {static: true}) rawInput: ElementRef;
  @Input() open = false;
  @Input() focus = false;
  @Input() value = '';
  @Input() size = '';
  @Input() forId: string;
  @Input() name: string;
  @Input() placeholder = '';
  @Input() arrowIconClassName = '';

  @Input()
  set disabled(v: boolean) {
    this._disabled = attrToBoolean(v);
  }

  get disabled() {
    return this._disabled;
  }

  @Input()
  set readonly(v: boolean) {
    this._readonly = attrToBoolean(v);
  }

  get readonly() {
    return this._readonly;
  }

  @Output() uiClean = new EventEmitter<any>();

  private _disabled = false;
  private _readonly = false;

  private onChange: (_: any) => any;
  private onTouched: () => any;

  constructor(@Inject(UI_DROPDOWN_ARROW_CLASSNAME) arrowIcon: string,
              private elementRef: ElementRef) {
    this.arrowIconClassName = arrowIcon;
  }

  @HostListener('keydown', ['$event'])
  keyDown(ev: KeyboardEvent) {
    if (ev.keyCode === ENTER) {
      const customEvent = document.createEvent('Event');
      customEvent.initEvent('uiDropdownInputClick', true, true);
      this.elementRef.nativeElement.dispatchEvent(customEvent);
    } else if (ev.keyCode === TAB) {
      const customEvent = document.createEvent('Event');
      customEvent.initEvent('uiDropdownInputBlur', true, true);
      this.elementRef.nativeElement.dispatchEvent(customEvent);
    }
  }

  focusIn() {
    this.rawInput.nativeElement.focus();
  }

  reset() {
    this.value = '';
    if (this.onChange) {
      this.onChange(this.value);
    }
    if (this.onTouched) {
      this.onTouched();
    }
    this.uiClean.emit(this.value);
  }

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
