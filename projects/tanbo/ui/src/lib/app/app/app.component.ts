import { Component, ElementRef, forwardRef, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { DropdownRenderer } from '../../dropdown/help';
import { ModalController } from '../../modal/help';
import { DialogConfig, DialogController } from '../help';
import { dialogAnimation, modalAnimation } from './animations';

@Component({
  selector: 'ui-app',
  templateUrl: './app.component.html',
  providers: [{
    provide: DropdownRenderer,
    useExisting: forwardRef(() => AppComponent)
  }],
  animations: [
    modalAnimation,
    dialogAnimation
  ]
})
export class AppComponent implements DropdownRenderer, OnInit, OnDestroy {
  modalTemplates: TemplateRef<any>[] = [];

  get isShowOverlay() {
    return this.modalTemplates.length > 0 || this.isShowDialog;
  }

  dialogConfig: DialogConfig;
  isShowDialog = false;
  private dialogCheckState = false;

  private subs: Subscription[] = [];

  constructor(private elementRef: ElementRef<HTMLElement>,
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
}
