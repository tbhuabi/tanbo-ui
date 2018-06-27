import { Component, OnDestroy, OnInit } from '@angular/core';
import { transition, trigger, state, style, animate, keyframes } from '@angular/animations';
import { Subscription } from 'rxjs';

import { ConfirmConfig, ConfirmController } from './confirm-controller';

@Component({
  selector: 'ui-confirm',
  templateUrl: './confirm.component.html',
  animations: [
    trigger('confirmAnimation', [
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

export class ConfirmComponent implements OnInit, OnDestroy {
  show: boolean = false;

  title: string = '';
  content: string = '';
  btnsText: Array<any> = ['取消', '确认'];
  result: boolean = false;

  private sub: Subscription;

  constructor(private confirmService: ConfirmController) {
  }

  ngOnInit() {
    // 订阅用户事件
    this.sub = this.confirmService.confirmConfig.subscribe((params: ConfirmConfig) => {
      // 设置动画状态
      this.show = true;

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
    this.confirmService.publishAction(this.result);
  }
}