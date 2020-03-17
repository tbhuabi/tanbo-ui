import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ModalController } from '@tanbo/ui/src/lib/modal/help';
import { DialogConfig, DialogController } from '@tanbo/ui/src/lib/app/dialog-controller';
import { DrawerController } from '@tanbo/ui/src/lib/app/drawer-controller';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild('demoModal', {read: TemplateRef, static: true})
  demoModal: TemplateRef<any>;
  @ViewChild('template', {static: true}) template: TemplateRef<any>;

  data = [];
  list = [{
    label: '111',
    value: '1'
  }, {
    label: '222',
    value: '2'
  }, {
    label: '333',
    value: '3'
  }, {
    label: '444',
    value: '4'
  }];

  form: FormGroup;

  constructor(private modalController: ModalController,
              private dialogController: DialogController,
              private drawerController: DrawerController,
              private formBuilder: FormBuilder) {


  }

  showModal() {
    setTimeout(() => {
      this.form = this.formBuilder.group({
        data: [['1', '2']]
      });
      this.modalController.show(this.template);
    }, 1000);

  }

  hideModal() {
    this.modalController.hide();
  }

  show() {
    const config: DialogConfig = {
      title: '标题',
      content: '提示消息！',
      confirmBtnText: '确认',
      cancelBtnText: '取消'
    };
    this.dialogController.dialog(config).then(b => {
      if (b) {
        console.log('你点击了确认按扭');
      } else {
        console.log('你点击了取消按扭');
      }
    });
  }

  show2() {
    this.drawerController.show({
      direction: 'bottom', // 默认为 bottom，可选 top、right、left
      content: this.template
    }).then(() => {
      console.log('隐藏完成！');
    });
  }

  submit() {
    // 提交表单
    this.drawerController.hide();
  }
}
