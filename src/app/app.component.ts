import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DialogController, ModalController } from '@tanbo/ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private modalController: ModalController,
              private dialogController: DialogController) {
  }

  ngOnInit() {

  }

  show() {
    this.dialogController.dialog({
      content: 'test'
    }).then(b => {
      alert(b);
    })
  }
}
