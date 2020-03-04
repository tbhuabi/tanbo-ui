import { Component, Input, HostBinding } from '@angular/core';
import { GourdBoolean } from '../utils';

@Component({
  /* tslint:disable */
  selector: '[uiButton]',
  /* tslint:enable */
  templateUrl: './button.component.html',
  host: {
    '[class.ui-button]': 'true'
  }
})
export class ButtonComponent {
  @Input()
  @HostBinding('class.ui-loading')
  @HostBinding('disabled')
  @GourdBoolean()
  loading = false;
}
