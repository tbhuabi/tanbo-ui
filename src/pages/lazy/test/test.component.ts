import { Component, OnInit } from '@angular/core';

import { NotifyController } from '../../../tanbo/ui/public_api';

@Component({
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  data: any[] = [111, 222, 333, 444, 555];

  constructor(private notifyController: NotifyController) {
  }

  ngOnInit() {
    // this.notifyController.push('test');
  }

  show(ev: any) {
    console.log(ev);
  }
}