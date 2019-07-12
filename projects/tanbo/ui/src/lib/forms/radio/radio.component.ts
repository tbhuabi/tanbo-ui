import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';

import { RadioStateService } from './radio-state.service';
import { AttrBoolean } from '../../utils';

@Component({
  selector: 'ui-input[type=radio]',
  templateUrl: './radio.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: RadioComponent,
    multi: true
  }]
})
export class RadioComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() name: string;
  @Input() value = '';
  @Input() forId: string;
  @Input() text = '';
  @Input() checkedIcon = 'ui-icon-radio-checked';
  @Input() uncheckedIcon = 'ui-icon-radio-unchecked';

  @Input() @HostBinding('class.ui-disabled') @AttrBoolean() disabled = false;
  @Input() @HostBinding('class.ui-readonly') @AttrBoolean() readonly = false;
  @Input() @HostBinding('class.ui-checked') @AttrBoolean() checked = false;

  @Output() uiChange = new EventEmitter<string>();

  @ViewChild('rawInput', {static: true})
  rawInput: ElementRef;
  sub: Subscription;

  @HostBinding('class.ui-focus')
  focus = false;

  private _disabled = false;
  private _readonly = false;
  private _checked = false;

  private onChange: (_: any) => any;
  private onTouched: () => any;

  constructor(private radioStateService: RadioStateService) {
  }

  @HostListener('click')
  click() {
    if (this.disabled || this.readonly) {
      return;
    }
    this.rawInput.nativeElement.checked = true;
    this.rawInput.nativeElement.focus();
    if (this.onChange) {
      this.onChange(this.value);
    }

    // 当自身被点击时，发布事件，更新其它radio状态
    this.radioStateService.publishEvent();
    this.uiChange.emit(this.value);
  }

  blur() {
    this.focus = false;
    if (this.onTouched) {
      this.onTouched();
    }
  }

  ngOnInit() {
    // 当某一个radio被点击时，更新其它radio状态
    this.sub = this.radioStateService.state.subscribe(() => {
      this.checked = this.rawInput.nativeElement.checked;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  writeValue(value: any) {
    if (typeof value === 'number') {
      this.checked = this.value === ('' + value);
    } else {
      this.checked = this.value === value;
    }
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
