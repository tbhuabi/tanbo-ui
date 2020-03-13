import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { GourdBoolean } from '../../utils';

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
  @Input() @GourdBoolean() disabled = false;
  @Input() @GourdBoolean() readonly = false;

  @Input() @HostBinding('class.ui-checked') @GourdBoolean() checked = false;

  @HostBinding('class.ui-focus')
  focus = false;

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
