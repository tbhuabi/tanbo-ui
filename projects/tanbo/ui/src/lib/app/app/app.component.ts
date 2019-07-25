import { Component, ElementRef, forwardRef, OnDestroy, OnInit, Renderer2, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { DropdownRenderer } from '../../dropdown/help';
import { ModalController } from '../../modal/help';
import { DialogConfig, DialogController } from '../dialog-controller';
import { NotifyController, NotifyType } from '../notify-controller';
import { dialogAnimation, modalAnimation, notifyAnimation } from './animations';
import { NavigationStart, Router } from '@angular/router';

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

  get isShowModal() {
    return this.modalTemplates.length > 0;
  }

  dialogConfig: DialogConfig;
  isShowDialog = false;

  private dialogCheckState = false;
  private subs: Subscription[] = [];
  private timer: any = null;
  private hideEventFromRouteChange = false;

  constructor(private elementRef: ElementRef<HTMLElement>,
              private router: Router,
              private renderer: Renderer2,
              private notifyController: NotifyController,
              private modalController: ModalController,
              private dialogController: DialogController) {
  }

  ngOnInit(): void {
    this.subs.push(this.router.events.subscribe(ev => {
      if (ev instanceof NavigationStart) {
        this.hideEventFromRouteChange = true;
        this.hideAllModal();
        this.isShowDialog = false;
      }
    }));
    this.subs.push(this.dialogController.config.subscribe(c => {
      this.hideEventFromRouteChange = false;
      this.showDialog(c);
    }));
    this.subs.push(this.modalController.showEvent.subscribe(temp => {
      this.showModal(temp);
    }));
    this.subs.push(this.modalController.hideEvent.subscribe(temp => {
      this.hideModal(temp);
    }));
    this.subs.push(this.modalController.hideAllEvent.subscribe(() => {
      this.hideAllModal();
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
      this.notifyStart();
    }));
  }

  ngOnDestroy(): void {
    this.subs.forEach(item => item.unsubscribe());
  }

  renderDropdown(ref: ElementRef) {
    this.renderer.appendChild(this.elementRef.nativeElement, ref.nativeElement);
    return () => {
      this.renderer.removeChild(this.elementRef.nativeElement, ref.nativeElement);
    };
  }

  showModal(template: TemplateRef<any>): void {
    this.modalTemplates.push(template);
  }

  hideModal(template?: TemplateRef<any>): void {
    if (template) {
      const index = this.modalTemplates.indexOf(template);
      if (index > -1) {
        this.modalTemplates.splice(index, 1);
      }
    } else {
      this.modalTemplates.pop();
    }
  }

  hideAllModal(): void {
    this.modalTemplates.length = 0;
  }

  showDialog(config: DialogConfig | string) {
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

  dialogOverlayHide() {
    if (!this.hideEventFromRouteChange) {
      this.dialogController.checkState.next(this.dialogCheckState);
    }
  }

  notifyClose(i: number) {
    this.messageList.splice(i, 1);
    this.notifyStart();
  }

  notifyStop(item: any) {
    item.time = item.rawConfig.time || 5000;
    item.currentTime = 0;
    item.proportion = 100;
    item.autoHide = false;
    this.notifyStart();
  }

  notifyRestart(item: any) {
    if (item.rawConfig.autoHide || item.rawConfig.autoHide === undefined) {
      item.autoHide = true;
    }
    this.notifyStart();
  }

  notifyStart() {
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
