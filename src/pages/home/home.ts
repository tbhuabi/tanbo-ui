import {
  Component,
  OnInit,
  Compiler,
  Injector,
  ViewChild,
  ViewContainerRef,
  NgModuleRef, Input, TemplateRef
} from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

import { ModalController } from '../../tanbo/ui/public_api';

@Component({
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent {
  @ViewChild('modal') modal: TemplateRef<any>;
  name = '';

  constructor(private modalController: ModalController) {
  }
  submit() {
    console.log(333);
  }

  show() {
    this.modalController.show(this.modal);
  }
}