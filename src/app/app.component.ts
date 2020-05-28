import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DrawerController } from '@tanbo/ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('template', {static: true}) template: TemplateRef<any>;

  constructor(private drawerController: DrawerController) {
  }

  ngOnInit() {
  }

  show() {
    this.drawerController.show({
      direction: 'right', // 默认为 bottom，可选 top、right、left
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
