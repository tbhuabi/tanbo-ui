import { Component, ElementRef, forwardRef, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { DropdownRenderer } from '../../dropdown/help';
import { ModalController } from '../../modal/help';
import { DialogConfig, DialogController, NotifyController, NotifyType } from '../help';
import { dialogAnimation, modalAnimation, notifyAnimation } from './animations';

@Component({
  selector: 'ui-app',
  templateUrl: './app.component.html',
  providers: [{
    provide: DropdownRenderer,
    useExisting: forwardRef(() => AppComponent)
  }],
  animations: [
    modalAnimation,
    dialogAnimation,
    notifyAnimation
  ]
})
export class AppComponent implements DropdownRenderer, OnInit, OnDestroy {
  modalTemplates: TemplateRef<any>[] = [];
  messageList: Array<any> = [];

  get isShowOverlay() {
    return this.modalTemplates.length > 0 || this.isShowDialog;
  }

  dialogConfig: DialogConfig;
  isShowDialog = false;

  private dialogCheckState = false;
  private subs: Subscription[] = [];
  private timer: any = null;

  constructor(private elementRef: ElementRef<HTMLElement>,
              private notifyController: NotifyController,
              private modalController: ModalController,
              private dialogController: DialogController) {
  }

  ngOnInit(): void {
    this.subs.push(this.dialogController.config.subscribe(c => {
      this.dialog(c);
    }));
    this.subs.push(this.modalController.showEvent.subscribe(temp => {
      this.show(temp);
    }));
    this.subs.push(this.modalController.hideEvent.subscribe(temp => {
      this.hide(temp);
    }));
    this.subs.push(this.modalController.hideAllEvent.subscribe(() => {
      this.hideAll();
    }));
    this.subs.push(this.notifyController.notify.subscribe(config => {
      if (typeof config === 'string') {
        config = {
          content: config,
          autoHide: true
        };
      }
      const _config: any = {};
      _config.rawConfig = config;
      switch (config.type) {
        case NotifyType.Default:
          _config.type = 'default';
          break;
        case NotifyType.Primary:
          _config.type = 'primary';
          break;
        case NotifyType.Info:
          _config.type = 'info';
          break;
        case NotifyType.Success:
          _config.type = 'success';
          break;
        case NotifyType.Warning:
          _config.type = 'warning';
          break;
        case NotifyType.Danger:
          _config.type = 'danger';
          break;
        default:
          _config.type = 'primary';
      }
      _config.content = config.content || '';
      _config.time = config.time || 3000;
      _config.autoHide = config.autoHide === undefined ? true : config.autoHide;

      _config.currentTime = 0;
      _config.proportion = 100;

      this.messageList.push(_config);
      this.start();
    }));
  }

  ngOnDestroy(): void {
    this.subs.forEach(item => item.unsubscribe());
  }

  renderDropdown(ref: ElementRef) {
    this.elementRef.nativeElement.appendChild(ref.nativeElement);
    return () => {
      if (ref.nativeElement.parentNode) {
        ref.nativeElement.parentNode.removeChild(ref.nativeElement);
      }
    };
  }

  show(template: TemplateRef<any>): void {
    this.modalTemplates.push(template);
  }

  hide(template?: TemplateRef<any>): void {
    if (template) {
      const index = this.modalTemplates.indexOf(template);
      if (index > -1) {
        this.modalTemplates.splice(index, 1);
      }
    } else {
      this.modalTemplates.pop();
    }
  }

  hideAll(): void {
    this.modalTemplates.length = 0;
  }

  dialog(config: DialogConfig | string) {
    this.isShowDialog = true;
    this.dialogConfig = Object.assign<DialogConfig, DialogConfig>({
      content: '',
      confirmBtnText: '确定',
      cancelBtnText: '取消'
    }, typeof config === 'string' ? {
      content: config
    } : config);
  }

  dialogChecked(checked: boolean) {
    this.dialogCheckState = checked;
    this.isShowDialog = false;
  }

  overlayHide() {
    this.dialogController.checkState.next(this.dialogCheckState);
  }

  close(i: number) {
    this.messageList.splice(i, 1);
    this.start();
  }

  stop(item: any) {
    item.time = item.rawConfig.time || 5000;
    item.currentTime = 0;
    item.proportion = 100;
    item.autoHide = false;
    this.start();
  }

  restart(item: any) {
    if (item.rawConfig.autoHide || item.rawConfig.autoHide === undefined) {
      item.autoHide = true;
    }
    this.start();
  }

  start() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      let isClear = true;
      for (let i = 0; i < this.messageList.length; i++) {
        const item = this.messageList[i];
        if (item.autoHide) {
          isClear = false;

          item.currentTime += 20;
          let n = item.currentTime / item.time;
          item.proportion = (n > 1 ? 1 : n) * 100;
          if (n > 1) {
            this.messageList.splice(i, 1);
            i--;
          }
        }
      }
      if (isClear) {
        clearInterval(this.timer);
      }
    }, 20);
  }
}
