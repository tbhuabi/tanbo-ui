import { Component, ElementRef, EventEmitter, HostBinding, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';

import { attrToBoolean } from '../../utils';

@Component({
  selector: 'ui-input[type=range]',
  templateUrl: './range.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: RangeComponent,
    multi: true
  }]
})
export class RangeComponent implements ControlValueAccessor {
  @ViewChild('rangeBar', {static: true}) rangeBar: ElementRef;
  @ViewChild('rangeProgressBar', {static: true}) rangeProgressBar: ElementRef;
  @Input() name: string;
  @Input() forId: string;
  @Input() showProgress = true;

  @Input()
  @HostBinding('class.ui-disabled')
  set disabled(isDisabled: any) {
    this._disabled = attrToBoolean(isDisabled);
  }

  get disabled() {
    return this._disabled;
  }

  @Input()
  @HostBinding('class.ui-readonly')
  set readonly(isReadonly: any) {
    this._readonly = attrToBoolean(isReadonly);
  }

  get readonly() {
    return this._readonly;
  }

  @Input()
  set min(min: any) {
    const v = RangeComponent.toNumber(min);
    if (!isNaN(v)) {
      this._min = v;
    }
  }

  get min() {
    return this._min;
  }

  @Input()
  set max(max: any) {
    const v = RangeComponent.toNumber(max);
    if (!isNaN(v)) {
      this._max = v;
    }
  }

  get max() {
    return this._max;
  }

  @Input()
  set step(step: any) {
    const v = RangeComponent.toNumber(step);
    if (!isNaN(v)) {
      this._step = v;
    }
  }

  get step() {
    return this._step;
  }

  @Input()
  set value(value: any) {
    let v = RangeComponent.toNumber(value);
    if (!isNaN(v)) {
      this._value = v;
      if (this.min <= this.max) {
        if (v < this.min) {
          v = this.min;
        } else if (v > this.max) {
          v = this.max;
        }
        this.position = (v - this.min) / (this.max - this.min) * 100;
      }
    }
  }

  get value() {
    return this._value;
  }

  @Output() uiChange = new EventEmitter<number>();

  position: number = 50;
  isTouching: boolean = false;

  private _disabled: boolean = false;
  private _readonly: boolean = false;
  private _min: number = 0;
  private _max: number = 100;
  private _step: number = 1;
  private _value: number = 50;

  private onChange: (_: any) => any;
  private onTouched: () => any;

  static toNumber(value: any): number {
    if (typeof value === 'number') {
      return value;
    }
    return Number(value);
  }

  constructor(private renderer: Renderer2) {

  }

  keyDown(ev: KeyboardEvent) {
    const oldValue = this.value;
    const updateValue = (offset: number) => {
      this.isTouching = true;
      if (ev.shiftKey) {
        offset *= 10;
      }
      this.value += offset;
      if (this.value < this.min) {
        this.value = this.min;
      } else if (this.value > this.max) {
        this.value = this.max - (this.max - this.min) % this.step;
      }
      if (this.value !== oldValue) {
        if (this.onChange) {
          this.onChange(this.value);
        }
        this.uiChange.emit(this.value);
      }
    };
    if (ev.keyCode === LEFT_ARROW) {
      updateValue(-this.step);
      ev.preventDefault();
      return false;
    } else if (ev.keyCode === RIGHT_ARROW) {
      updateValue(this.step);
      ev.preventDefault();
      return false;
    }
  }

  drag(event: any) {
    if (this.readonly || this.disabled) {
      return;
    }
    this.isTouching = true;
    let unbindMouseUpFn: () => void;
    let unbindMouseMoveFn: () => void;

    if (this.min >= this.max) {
      return;
    }
    unbindMouseUpFn = this.renderer.listen('document', 'mouseup', () => {
      this.isTouching = false;
      unbindMouseMoveFn();
      unbindMouseUpFn();
    });

    const section = this.max - this.min;
    const maxWidth = this.rangeBar.nativeElement.offsetWidth;
    const nowWidth = this.rangeProgressBar.nativeElement.offsetWidth;

    const oldX: number = event.clientX;

    let oldValue = this.value;

    unbindMouseMoveFn = this.renderer.listen('document', 'mousemove', (ev: any) => {
      const dragDistance: number = ev.clientX - oldX;
      const proportion = (nowWidth + dragDistance) / maxWidth;
      const temporaryValue = Math.floor(section * proportion / this.step) * this.step;

      let value = this.min + temporaryValue;
      if (value < this.min) {
        value = this.min;
      } else if (value > this.max) {
        value = this.max - (this.max - this.min) % this.step;
      }
      if (value !== oldValue) {
        this.value = value;
        oldValue = value;
        if (this.onChange) {
          this.onChange(value);
        }

        this.uiChange.emit(value);
      }
      ev.stopPropagation();
      ev.preventDefault();
    });
  }

  blur() {
    this.isTouching = false;
    if (this.onTouched) {
      this.onTouched();
    }
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
