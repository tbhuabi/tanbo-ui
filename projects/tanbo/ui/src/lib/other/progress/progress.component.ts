import { Component, Input } from '@angular/core';
import { AttrNumber } from '../../utils';

@Component({
  selector: 'ui-progress',
  templateUrl: './progress.component.html'
})
export class ProgressComponent {
  @Input() @AttrNumber(1) value = 1;
  @Input() @AttrNumber(0) min = 0;
  @Input() @AttrNumber(100) max = 100;
  @Input() type = 'line'; // circle
  @Input() @AttrNumber(6) lineWidth = 6;
  @Input() @AttrNumber(100) size = 100;

  get percent() {
    return (this.value - this.min) / (this.max - this.min);
  }

  get text() {
    return Math.floor(this.percent * 100);
  }

  get viewBox() {
    return `0 0 ${this.size} ${this.size}`;
  }

  get path() {
    const r = (this.size - this.lineWidth ) / 2;
    /* tslint:disable */
    return `M ${this.size / 2} ${this.lineWidth / 2} a ${r} ${r} 0 1 1 0 ${this.size - this.lineWidth} a ${r} ${r} 0 1 1 0 ${-this.size + this.lineWidth}`;
    /* tslint:enable */
  }

  get dasharray() {
    return [
      (this.size - this.lineWidth ) * Math.PI * this.percent + 'px',
      (this.size - this.lineWidth ) * Math.PI + 'px'
    ].join(',');
  }
}
