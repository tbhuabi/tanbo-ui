import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DialogController, ModalController } from '@tanbo/ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('template') template: TemplateRef<any>;
  isShow = false;

  constructor(private modalController: ModalController,
              private dialogController: DialogController) {
  }

  ngOnInit() {
    this.dialogController.dialog({
      content: 'test'
    }).then(b => {
      alert(b);
    })
  }

  show() {
    this.modalController.show(this.template);
  }

  hide() {
    this.modalController.hide(this.template);
  }
}
