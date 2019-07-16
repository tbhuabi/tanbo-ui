import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  AfterViewInit,
  HostBinding,
  HostListener
} from '@angular/core';

import { SelectService } from '../select/select.service';

import { attrToBoolean } from '../../utils';

@Component({
  selector: 'ui-option',
  templateUrl: './option.component.html'
})
export class OptionComponent implements AfterViewInit {
  @Input() value = '';

  @Input()
  @HostBinding('class.ui-disabled')
  set disabled(v: boolean) {
    this._disabled = attrToBoolean(v);
  }

  get disabled() {
    return this._disabled;
  }


  @Input()
  @HostBinding('class.ui-selected')
  set selected(v: boolean) {
    this._selected = attrToBoolean(v);
  }

  get selected() {
    return this._selected;
  }

  @HostBinding('class.ui-focus')
  get isFocus() {
    return this.focus && !this.disabled;
  }

  focus = false;

  @Output() uiChecked = new EventEmitter<OptionComponent>();
  nativeElement: HTMLElement;

  private _disabled = false;
  private _selected = false;

  constructor(private elementRef: ElementRef,
              private selectService: SelectService) {
  }

  @HostListener('click')
  click() {
    if (!this.disabled) {
      this.selectService.checked(this);
      this.uiChecked.emit(this);
    }
  }

  ngAfterViewInit() {
    this.nativeElement = this.elementRef.nativeElement;
  }
}
