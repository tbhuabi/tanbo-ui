import {
  Directive,
  Input,
  ElementRef,
  OnDestroy,
  ViewContainerRef,
  HostListener,
  ComponentFactoryResolver,
  ComponentFactory,
  ComponentRef,
  Output,
  EventEmitter, TemplateRef
} from '@angular/core';
import { Subscription } from 'rxjs';

import { PopConfirmComponent } from './pop-confirm.component';

@Directive({
  selector: '[uiPopConfirm]'
})
export class PopConfirmDirective implements OnDestroy {
  @Input()
  uiPopConfirm: string| TemplateRef<any> = '';
  @Input()
  popConfirmPosition = '';

  @Output()
  uiConfirm = new EventEmitter<void>();
  @Output()
  uiCancel = new EventEmitter<void>();

  private instance: PopConfirmComponent;
  private tooltipComponent: ComponentRef<PopConfirmComponent>;
  private tooltipFactory: ComponentFactory<PopConfirmComponent>;

  private isSelfClick = false;
  private isShow = false;

  private subs: Subscription[] = [];

  constructor(private elementRef: ElementRef,
              private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef) {
  }

  @HostListener('click')
  mouseEnter() {
    this.isSelfClick = true;
    if (!this.instance) {
      this.tooltipFactory = this.componentFactoryResolver.resolveComponentFactory(PopConfirmComponent);
      this.tooltipComponent = this.viewContainerRef.createComponent(this.tooltipFactory);
      this.instance = this.tooltipComponent.instance;
      this.subs.push(this.instance.uiConfirm.subscribe(() => {
        this.isShow = false;
        this.uiConfirm.emit();
      }));
      this.subs.push(this.instance.uiCancel.subscribe(() => {
        this.isShow = false;
        this.uiCancel.emit();
      }));
    }
    if (this.isShow) {
      this.instance.hide();
      this.isShow = false;
      return;
    }
    this.instance.contents = this.uiPopConfirm;
    this.instance.referenceElement = this.elementRef.nativeElement;
    this.instance.position = this.popConfirmPosition;
    this.instance.show();
    this.isShow = true;
  }

  @HostListener('document:click')
  globalClick() {
    if (this.isShow && !this.isSelfClick) {
      this.instance.hide();
      this.isShow = false;
    }
    this.isSelfClick = false;
  }

  ngOnDestroy() {
    if (this.instance) {
      this.tooltipComponent.destroy();
    }
    this.subs.forEach(item => item.unsubscribe());
  }
}
