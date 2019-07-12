import { Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';

import { ModalHeaderComponent } from '../modal-header/modal-header.component';
import { ModalFooterComponent } from '../modal-footer/modal-footer.component';

@Component({
  selector: 'ui-modal',
  templateUrl: './modal.component.html',
  host: {
    '[class.ui-modal-lg]': 'size === "lg"',
    '[class.ui-modal-sm]': 'size === "sm"'
  }
})
export class ModalComponent {
  @ContentChild(ModalHeaderComponent, {static: false}) modalHeader: ModalHeaderComponent;
  @ContentChild(ModalFooterComponent, {static: false}) modalFooter: ModalFooterComponent;
  @Input() size = '';
  @Input() title = '';
  @Input() cancelText = '取消';
  @Input() confirmText = '确定';
  @Input() hideDefaultHeader = false;
  @Input() hideDefaultFooter = false;
  @Input() confirmBtnType = 'button';
  @Input() theme = 'dark';

  @Output() uiConfirm = new EventEmitter<any>();
  @Output() uiClose = new EventEmitter<any>();

  get classes() {
    const themes = {
      default: 'ui-default',
      primary: 'ui-primary',
      success: 'ui-success',
      info: 'ui-info',
      warning: 'ui-warning',
      danger: 'ui-danger',
      dark: 'ui-dark'
    };
    return themes[this.theme] || this.theme;
  }

  get showDefaultHeader() {
    return !this.modalHeader || this.hideDefaultHeader;
  }

  get showDefaultFooter() {
    return !this.modalFooter || this.hideDefaultFooter;
  }
}
