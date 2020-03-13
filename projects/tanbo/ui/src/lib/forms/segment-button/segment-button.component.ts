import {
  Component,
  AfterViewInit,
  Input,
  HostBinding,
  Output,
  EventEmitter,
  HostListener,
  ElementRef
} from '@angular/core';

import { SegmentController } from '../segment/segment.controller';
import { GourdBoolean } from '../../utils';

@Component({
  selector: 'ui-segment-button',
  templateUrl: './segment-button.component.html'
})
export class SegmentButtonComponent implements AfterViewInit {
  @Output() uiChecked = new EventEmitter<SegmentButtonComponent>();
  @Input() value: any = '';

  @Input() @GourdBoolean()
  @HostBinding('class.ui-disabled')
  disabled = false;

  @Input()
  @HostBinding('class.ui-selected')
  @GourdBoolean()
  selected = false;

  nativeElement: HTMLElement;

  constructor(private elementRef: ElementRef,
              private segmentService: SegmentController) {
  }

  @HostListener('click')
  click() {
    if (!this.disabled) {
      this.segmentService.checked(this);
      this.uiChecked.emit(this);
    }
  }

  ngAfterViewInit() {
    this.nativeElement = this.elementRef.nativeElement;
  }
}
