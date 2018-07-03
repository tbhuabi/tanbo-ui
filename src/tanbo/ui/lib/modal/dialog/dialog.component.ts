import { Component, OnDestroy, OnInit } from '@angular/core';
import { transition, trigger, style, animate, keyframes } from '@angular/animations';
import { Subscription } from 'rxjs';

import { DialogConfig, DialogController } from './dialog-controller';

@Component({
  selector: 'ui-dialog',
  templateUrl: './diolog.component.html',
  animations: [
    trigger('dialogAnimation', [
      transition(':enter', animate('.1s', keyframes([
        style({
          transform: 'translateY(-100%)',
          offset: 0
        }),
        style({
          transform: 'translateY(0)',
          offset: 1
        })
      ]))),
      transition(':leave', animate(100, keyframes([
        style({
          transform: 'translateY(0)',
          offset: 0
        }),
        style({
          transform: 'translateY(-100%)',
          offset: 1
        })
      ])))
    ])
  ]
})

export class DialogComponent implements OnInit, OnDestroy {
  show: boolean = false;

  title: string = '';
  content: string = '';
  btnsText: Array<any> = ['取消', '确认'];
  result: boolean = false;

  private sub: Subscription;

  constructor(private dialogController: DialogController) {
  }

  ngOnInit() {
    // 订阅用户事件
    this.sub = this.dialogController.config.subscribe((params: DialogConfig | string) => {
      // 设置动画状态
      this.show = true;

      if (typeof params === 'string') {
        params = {
          content: params
        };
      }

      // 赋值相应参数
      this.title = params.title;
      this.content = params.content;
      if (params.btnsText) {
        this.btnsText = params.btnsText;
      }

    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  checked(result: boolean) {
    // 当用户点击按扭时，关闭弹窗
    this.show = false;
    this.result = result;
  }

  hide() {
    // 当弹窗关闭动画完成时，发布相应事件
    this.dialogController.publishAction(this.result);
  }
}