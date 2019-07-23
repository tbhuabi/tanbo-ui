import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalController, DialogController, NotifyController } from '@tanbo/ui';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
  @ViewChild('demoModal', {read: TemplateRef, static: true})
  demoModal: TemplateRef<any>;
  time = '00:00:00';
  disable = 'true';
  @ViewChild('modal', {static: true}) modal: TemplateRef<any>;

  constructor(private modalController: ModalController,
              private notifyController: NotifyController,
              private dialogController: DialogController) {
  }

  notify() {
    this.notifyController.push('4321431');
  }

  showDialog() {
    this.dialogController.dialog({
      title: 'title',
      content: 'test'
    }).then(result => {
      console.log(result);
    });
    // this.showModal()
  }

  showModal() {
    this.modalController.show(this.demoModal);
  }

  hideModal() {
    this.modalController.hide();
  }

}
