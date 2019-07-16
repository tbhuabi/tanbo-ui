import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { attrToNumber } from '../../utils';

@Component({
  selector: 'ui-progress',
  templateUrl: './progress.component.html'
})
export class ProgressComponent implements OnChanges {
  @Input() value = 1;
  @Input() min = 0;
  @Input() max = 100;
  @Input() type = 'line'; // circle
  @Input() lineWidth = 6;
  @Input() size = 100;

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
    const r = (this.size - this.lineWidth) / 2;
    /* tslint:disable */
    return `M ${this.size / 2} ${this.lineWidth / 2} a ${r} ${r} 0 1 1 0 ${this.size - this.lineWidth} a ${r} ${r} 0 1 1 0 ${-this.size + this.lineWidth}`;
    /* tslint:enable */
  }

  get dasharray() {
    return [
      (this.size - this.lineWidth) * Math.PI * this.percent + 'px',
      (this.size - this.lineWidth) * Math.PI + 'px'
    ].join(',');
  }

  ngOnChanges(changes: SimpleChanges): void {
    Object.keys(changes).forEach(key => {
      if (key !== 'type') {
        this[key] = attrToNumber(changes[key].currentValue);
      }
    });
  }
}
