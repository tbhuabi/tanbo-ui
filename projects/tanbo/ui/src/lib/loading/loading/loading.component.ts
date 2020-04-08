import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'ui-loading',
  templateUrl: './loading.component.html'
})
export class LoadingComponent {
  @Input() scale = 1;
  @Input() color = '';

  @HostBinding('style.transform')
  @HostBinding('style.webkitTransform')
  get size() {
    return `scale(${this.scale})`;
  }
}
