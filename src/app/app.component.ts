import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalController } from '@tanbo/ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('template') template: TemplateRef<any>;
  isShow = false;

  constructor(private modalController: ModalController) {
  }

  ngOnInit() {
    // setTimeout(() => {
    //   this.isShow = true;
    // }, 1000);
  }

  show() {
    this.modalController.show(this.template);
  }
}
