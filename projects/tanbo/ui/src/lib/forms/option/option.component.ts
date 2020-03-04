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
import { GourdBoolean } from '../utils';

@Component({
  selector: 'ui-option',
  templateUrl: './option.component.html'
})
export class OptionComponent implements AfterViewInit {
  @Input() value = '';
  @Input()
  @HostBinding('class.ui-disabled') @GourdBoolean() disabled = false;
  @Input()
  @HostBinding('class.ui-selected') @GourdBoolean() selected = false;

  @HostBinding('class.ui-focus')
  get isFocus() {
    return this.focus && !this.disabled;
  }

  focus = false;

  @Output() uiChecked = new EventEmitter<OptionComponent>();
  nativeElement: HTMLElement;

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
