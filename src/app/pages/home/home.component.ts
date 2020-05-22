import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ModalController } from '@tanbo/ui/src/lib/modal/help';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild('modal')
  modal: TemplateRef<any>;
  data = {
    date: ''
  };
  test = '';

  constructor(private modalController: ModalController) {
  }

  show() {
    console.log(this.data);
  }
}
