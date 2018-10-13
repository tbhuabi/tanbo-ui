import { Component, Input, Inject, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { UI_SELECT_ARROW_CLASSNAME } from '../help';
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
  @Input() open = false;
  @Input() focus = false;
  @Input() value = '';
  @Input() size: string = '';
  @Input() forId: string;
  @Input() name: string;
  @Input() placeholder: string = '';
  @Input() arrowIconClassName: string = '';

  @Input()
  set disabled(isDisabled: any) {
    this._disabled = attrToBoolean(isDisabled);
  }

  get disabled() {
    return this._disabled;
  }

  @Input()
  set readonly(isReadonly: any) {
    this._readonly = attrToBoolean(isReadonly);
  }

  get readonly() {
    return this._readonly;
  }

  @Output() uiReset = new EventEmitter<any>();

  private _disabled: boolean = false;
  private _readonly: boolean = false;
  private onChange: (_: any) => any;
  private onTouched: () => any;

  constructor(@Inject(UI_SELECT_ARROW_CLASSNAME) arrowIcon: string) {
    this.arrowIconClassName = arrowIcon;
  }

  reset() {
    this.value = '';
    if (this.onChange) {
      this.onChange(this.value);
    }
    if (this.onTouched) {
      this.onTouched();
    }
    this.uiReset.emit(this.value);
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