import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  HostBinding,
  HostListener, OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';

import { SelectService } from '../select/select.service';
import { GourdBoolean } from '../../utils';

@Component({
  selector: 'ui-option',
  templateUrl: './option.component.html'
})
export class OptionComponent implements OnDestroy {
  @Input()
  set value(v: any) {
    this._value = v;
  }

  get value() {
    return (this._value === null || this._value === undefined) ? this.text : this._value;
  }

  @Input()
  @HostBinding('class.ui-disabled') @GourdBoolean() disabled = false;
  @Input()
  @HostBinding('class.ui-selected') @GourdBoolean() selected = false;

  @HostBinding('class.ui-focus')
  get isFocus() {
    return this.focus && !this.disabled;
  }

  @Output() uiChecked = new EventEmitter<OptionComponent>();

  @HostBinding('class.ui-option-multiple')
  canMultiple = false;

  get text() {
    return this.elementRef.nativeElement.innerText.replace(/^[\s\n\t\r]+|[\s\n\t\r]+$/g, '');
  }

  focus = false;
  private sub: Subscription;
  private _value: any = '';

  constructor(private elementRef: ElementRef,
              private selectService: SelectService) {
    this.sub = this.selectService.isMultiple.subscribe(b => {
      this.canMultiple = b;
    });
  }

  @HostListener('click')
  click() {
    if (!this.disabled) {
      this.selectService.checked(this);
      this.uiChecked.emit(this);
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
