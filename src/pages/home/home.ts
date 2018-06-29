import { Component, TemplateRef, ViewChild } from '@angular/core';

import { ModalController } from '../../tanbo/ui/public_api';

@Component({
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent {
  @ViewChild('modal')
  modal: TemplateRef<any>;
  name = 'testname';

  constructor(private modalController: ModalController) {
  }

  show() {
    this.modalController.show(this.modal);
  }

  hide() {
    this.modalController.hide();
  }
}
