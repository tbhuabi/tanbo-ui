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
  initValue: string = 'init value'
  imgUrl: string = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542172864712&di=1202c0666232da5cbd4e632a0593d05b&imgtype=0&src=http%3A%2F%2Ffmn.rrimg.com%2Ffmn060%2Fxiaozhan%2F20121107%2F2330%2Fxlarge_qdn2_42ae000018f0125b.jpg';
  constructor(private modalController: ModalController) {
  }
  submit() {
    console.log(333);
  }
  changeText(str: any) {
    console.log(str);
  }
  change(obj: object) {
    console.log(obj);
  }


  show() {
    this.modalController.show(this.modal);
  }
}