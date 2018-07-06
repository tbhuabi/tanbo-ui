import { NgModule } from '@angular/core';

import { TimelineComponent } from './timeline/timeline.component';
import { TimelineItemComponent } from './timeline-item/timeline-item.component';

@NgModule({
  declarations: [
    TimelineComponent,
    TimelineItemComponent
  ],
  exports: [
    TimelineComponent,
    TimelineItemComponent
  ]
})
export class UITimelineModule {

}