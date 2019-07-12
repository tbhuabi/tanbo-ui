import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { AttrBoolean } from '../../utils';

@Component({
  selector: 'ui-input[type=checkbox]',
  templateUrl: './checkbox.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: CheckboxComponent,
    multi: true
  }]
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() name: string;
  @Input() text = '';
  @Input() value = '';
  @Input() forId: string;
  @Input() checkedIcon = 'ui-icon-checkbox-checked';
  @Input() uncheckedIcon = 'ui-icon-checkbox-unchecked';

  @Input() @HostBinding('class.ui-disabled') @AttrBoolean() disabled = false;
  @Input() @HostBinding('class.ui-readonly') @AttrBoolean() readonly = false;
  @Input() @HostBinding('class.ui-checked') @AttrBoolean() checked = false;

  @HostBinding('class.ui-focus')
  focus = false;

  @Output() uiChange = new EventEmitter<boolean>();

  private onChange: (_: any) => any;
  private onTouched: () => any;

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
