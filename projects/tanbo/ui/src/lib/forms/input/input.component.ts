import { Component, Input, HostBinding, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ui-input[type=text],ui-input[type=number],ui-input[type=password]',
  templateUrl: './input.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true
  }]
})
export class InputComponent implements ControlValueAccessor {
  @Input()
  value: string = '';
  @Input()
  placeholder: string = '';
  @Input()
  type: string = 'text';
  @Input()
  name: string = '';
  @Input()
  forId: string = '';
  @Input()
  @HostBinding('class.ui-disabled')
  disabled: boolean = false;
  @Input()
  @HostBinding('class.ui-readonly')
  readonly: boolean = false;

  onChange = (_: any) => {};
  onTouched = () => {};

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