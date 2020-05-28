import { Component, ElementRef, forwardRef, OnDestroy, OnInit, Renderer2, TemplateRef } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { CubicBezier } from '@tanbo/bezier';
import { Subscription } from 'rxjs';

import { DropdownRenderer } from '../../dropdown/help';
import { ModalController } from '../../modal/help';
import { DialogConfig, DialogController } from '../dialog-controller';
import { NotifyController, NotifyType } from '../notify-controller';
import { DrawerController } from '../drawer-controller';

const ie9Reg = /msie\s9\.0/i;

function createModalStyles(step: number) {
  return ie9Reg.test(navigator.userAgent) ? {
    opacity: step,
    zoom: 0.95 + 0.05 * step
  } : {
    opacity: step,
    transform: 'scale(' + (0.95 + 0.05 * step) + ') translateX(-50%) translateY(-50%)'
  };
}

function createDialogStyles(step: number) {
  return ie9Reg.test(navigator.userAgent) ? {
    opacity: step,
    top: `calc(50px + ${(step - 1) * 100}%)`
  } : {
    opacity: step,
    transform: `translateY(${(step - 1) * 100}%)`
  };
}

function createNotifyStyles(step: number, isEnter: boolean) {
  return ie9Reg.test(navigator.userAgent) ? {
    opacity: step,
  } : {
    opacity: step,
    transition: '0.2s height',
    transform: isEnter ? `translateY(${(1 - step) * 100}%)` : `translateY(${(step - 1) * 100}%) scaleY(${step})`,
  };
}

@Component({
  selector: 'ui-app',
  templateUrl: './app.component.html',
  providers: [{
    provide: DropdownRenderer,
    useExisting: forwardRef(() => AppComponent)
  }]
})
export class AppComponent implements DropdownRenderer, OnInit, OnDestroy {
  modalTemplates: Array<{
    animationId: number;
    step: number;
    styles: { [key: string]: string | number };
    template: TemplateRef<any>;
  }> = [];
  messageList: Array<any> = [];

  get isShowModal() {
    return this.modalTemplates.length > 0;
  }

  dialogConfig: DialogConfig;
  dialogStyles: { [key: string]: string | number } = {};
  isShowDialog = false;
  dialogAnimationId: number;
  showDrawer = false;
  drawerDirection = 'bottom';
  drawerContent: TemplateRef<any> = null;
  private dialogCheckState = false;
  private subs: Subscription[] = [];
  private timer: any = null;
  private hideEventFromRouteChange = false;

  private cubicBezier = new CubicBezier(0.36, 0.66, 0.04, 1);

  constructor(private elementRef: ElementRef<HTMLElement>,
              private router: Router,
              private renderer: Renderer2,
              private notifyController: NotifyController,
              private modalController: ModalController,
              private dialogController: DialogController,
              private drawerController: DrawerController) {
  }

  ngOnInit(): void {
    this.subs.push(this.router.events.subscribe(ev => {
      if (ev instanceof NavigationStart) {
        this.hideEventFromRouteChange = true;
        this.hideAllModal();
        this.isShowDialog = false;
      }
    }));
    this.subs.push(this.drawerController.onShow.subscribe(c => {
      this.showDrawer = true;
      this.drawerDirection = c.direction;
      this.drawerContent = c.content;
    }));
    this.subs.push(this.drawerController.onHide.subscribe(() => {
      this.showDrawer = false;
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

      let i = 0;
      const max = 20;
      const fn = () => {
        _config.step = this.cubicBezier.update(i / max);
        _config.styles = createNotifyStyles(_config.step, true);
        i++;
        if (i <= max) {
          _config.animationId = requestAnimationFrame(fn);
        }
      };
      _config.step = 0;
      _config.animationId = requestAnimationFrame(() => {
        fn();
      });
      _config.styles = createNotifyStyles(0, true);

      this.messageList.push(_config);

      this.notifyStart();
    }));
  }

  ngOnDestroy(): void {
    this.subs.forEach(item => item.unsubscribe());
  }

  hideDrawer() {
    this.drawerController.hide();
  }

  renderDropdown(ref: ElementRef) {
    this.renderer.appendChild(this.elementRef.nativeElement, ref.nativeElement);
    return () => {
      this.renderer.removeChild(this.elementRef.nativeElement, ref.nativeElement);
    };
  }

  showModal(template: TemplateRef<any>): void {
    let i = 0;
    const max = 20;
    const fn = () => {
      config.step = this.cubicBezier.update(i / max);
      config.styles = createModalStyles(config.step);
      i++;
      if (i <= max) {
        config.animationId = requestAnimationFrame(fn);
      }
    };
    const config = {
      step: 0,
      animationId: requestAnimationFrame(() => {
        fn();
      }),
      template,
      styles: createModalStyles(0)
    };

    this.modalTemplates.push(config);
  }

  hideModal(template?: TemplateRef<any>): void {
    let config;
    if (template) {
      let index = -1;
      for (let i = 0; i < this.modalTemplates.length; i++) {
        if (this.modalTemplates[i].template === template) {
          index = i;
          break;
        }
      }
      if (index > -1) {
        config = this.modalTemplates[index];
      }
    } else {
      config = this.modalTemplates[this.modalTemplates.length - 1];
    }
    cancelAnimationFrame(config.animationId);
    let j = 20;
    const fn = () => {
      if (j < 0) {
        this.modalTemplates.splice(this.modalTemplates.indexOf(config), 1);
        return;
      }
      config.step = this.cubicBezier.update(j / 20);
      config.styles = createModalStyles(config.step);
      j--;
      requestAnimationFrame(fn);
    };
    fn();
  }

  hideAllModal(): void {
    this.modalTemplates.length = 0;
  }

  showDialog(config: DialogConfig | string) {
    let i = 0;
    let step = 0;
    const max = 16;
    this.dialogStyles = createDialogStyles(0);
    const fn = () => {
      step = this.cubicBezier.update(i / max);
      this.dialogStyles = createDialogStyles(step);
      i++;
      if (i <= max) {
        this.dialogAnimationId = requestAnimationFrame(fn);
      }
    };

    this.dialogAnimationId = requestAnimationFrame(() => {
      fn();
    });

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
    let j = 16;
    let step = 0;
    const fn = () => {
      step = this.cubicBezier.update(j / 16);
      this.dialogStyles = createDialogStyles(step);
      j--;
      if (j >= 0) {
        this.dialogAnimationId = requestAnimationFrame(fn);
      } else {
        this.dialogCheckState = checked;
        this.isShowDialog = false;
        cancelAnimationFrame(this.dialogAnimationId);
      }
    };
    fn();
  }

  dialogOverlayHide() {
    if (!this.hideEventFromRouteChange) {
      this.dialogController.checkState.next(this.dialogCheckState);
    }
  }

  notifyClose(i: number) {
    const config = this.messageList[i];
    cancelAnimationFrame(config.animationId);
    let j = 20;
    const fn = () => {
      if (j < 0) {
        this.messageList.splice(i, 1);
        this.notifyStart();
        return;
      }
      config.step = this.cubicBezier.update(j / 20);
      config.styles = createNotifyStyles(config.step, false);
      j--;
      requestAnimationFrame(fn);
    };
    fn();
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
    let isClosing = false;
    this.timer = setInterval(() => {
      let isClear = true;
      for (let i = 0; i < this.messageList.length; i++) {
        const item = this.messageList[i];
        if (item.autoHide) {
          isClear = false;
          item.currentTime += 20;
          const n = item.currentTime / item.time;
          item.proportion = (n > 1 ? 1 : n) * 100;
          if (n > 1 && !isClosing) {
            isClosing = true;
            const config = item;
            cancelAnimationFrame(config.animationId);
            let j = 20;
            const fn = () => {
              if (j < 0) {
                i--;
                this.messageList.splice(i, 1);
                isClosing = false;
                return;
              }
              config.step = this.cubicBezier.update(j / 20);
              config.styles = createNotifyStyles(config.step, false);
              j--;
              requestAnimationFrame(fn);
            };
            fn();
          }
        }
      }
      if (isClear) {
        clearInterval(this.timer);
      }
    }, 20);
  }
}
