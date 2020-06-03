import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DrawerController, ModalController } from '@tanbo/ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('demoModal', {read: TemplateRef, static: true})
  demoModal: TemplateRef<any>;

  constructor(private modalController: ModalController) {
  }

  showModal() {
    this.modalController.show(this.demoModal);
  }

  hideModal() {
    this.modalController.hide();
  }
}
