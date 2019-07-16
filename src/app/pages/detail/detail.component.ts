import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalController } from '@tanbo/ui';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  time = '00:00:00';
  disable = 'true';
  @ViewChild('modal', {static: true}) modal: TemplateRef<any>;

  constructor(private modalController: ModalController) {
  }

  ngOnInit() {
  }

  show() {
    this.modalController.show(this.modal);
  }

}
