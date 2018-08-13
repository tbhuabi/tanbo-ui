import { Component, OnInit, ViewChild } from '@angular/core';

import { NotifyController, ModalController } from '../../../tanbo/ui/public_api';

@Component({
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  @ViewChild('modal')
  modal: any;
  name = '';
  data: any[] = [111, 222, 333, 444, 555];

  constructor(private notifyController: NotifyController,
              private modalController: ModalController) {
  }

  ngOnInit() {
    // this.notifyController.push('test');
  }

  show(ev: any) {
    this.modalController.show(this.modal);
  }
}