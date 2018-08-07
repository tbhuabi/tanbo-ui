import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TabService } from './tab.service';

@Component({
  selector: 'ui-tab',
  templateUrl: './tab.component.html',
  providers: [
    TabService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent {
}