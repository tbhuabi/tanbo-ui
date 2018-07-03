import { Component, TemplateRef, ViewChild } from '@angular/core';

import { ModalController, NotifyController, NotifyType } from '../../tanbo/ui/public_api';

@Component({
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent {
  @ViewChild('modal')
  modal: TemplateRef<any>;
  name = 'testname';

  constructor(private modalController: ModalController,
              private notifyController: NotifyController) {
  }

  show() {
    // this.notifyController.push('w3schools.com 是最受欢迎的前端技术教程网站');
    // this.notifyController.push({
    //   content: '但是国内用户一直不能访问，并且国内的中文翻译版本十分陈旧。因此做了个镜像，希望英文好的同学直接去看原版教程吧！',
    //   type: NotifyType.Info,
    //   autoHide: false
    // });
    // this.notifyController.push({
    //   content: 'w3schools.com 是最受欢迎的前端技术教程网站希望英文好的同学直接去看原版教程吧！',
    //   type: NotifyType.Success,
    //   autoHide: true
    // });
    this.notifyController.push({
      content: 'w3schools.com ',
      type: NotifyType.Warning,
      autoHide: true
    });
    this.notifyController.push({
      content: '希望英文好的同学直接去看原版教程吧！',
      type: NotifyType.Danger,
      autoHide: true
    });
    // this.notifyController.push({
    //   content: 'w3schools.com 是最受欢迎的前端技术教程网站，但是国内用户一直不能访问，并且国内的中文翻译版本十分陈旧。因此做了个镜像，希望英文好的同学直接去看原版教程吧！',
    //   type: NotifyType.Default,
    //   autoHide: true
    // });
  }

  hide() {
    this.modalController.hide();
  }
}
