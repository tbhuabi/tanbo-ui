import { Component, OnInit, ViewChild } from '@angular/core';

import { NotifyController, ModalController } from '../../../tanbo/ui/public_api';

@Component({
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  loading = false;

  constructor(private notifyController: NotifyController,
              private modalController: ModalController) {
  }

  ngOnInit() {
    // this.notifyController.push('test');
  }

  show() {
    this.loading = !this.loading;
  }
}