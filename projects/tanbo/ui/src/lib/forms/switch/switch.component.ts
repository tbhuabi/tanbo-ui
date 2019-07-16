import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { attrToBoolean } from '../../utils';

@Component({
  selector: 'ui-switch',
  templateUrl: './switch.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SwitchComponent,
    multi: true
  }]
})
export class SwitchComponent implements ControlValueAccessor {
  @Output() uiChange = new EventEmitter<boolean>();
  @Input() forId: string;
  @Input() value = '';
  @Input() name: string;
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

  @Input() @HostBinding('class.ui-checked')
  set checked(v: boolean) {
    this._checked = attrToBoolean(v);
  }

  get checked() {
    return this._checked;
  }

  @HostBinding('class.ui-focus')
  focus = false;

  private _checked = false;
  private _disabled = false;
  private _readonly = false;

  private onChange: (_: any) => void;
  private onTouched: () => void;

  click() {
    if (this.disabled || this.readonly) {
      return;
    }
    this.checked = !this.checked;
    if (this.onChange) {
      this.onChange(this.checked);
    }
    if (this.onTouched) {
      this.onTouched();
    }
    this.uiChange.emit(this.checked);
  }

  writeValue(value: any) {
    this.checked = !!value;
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
