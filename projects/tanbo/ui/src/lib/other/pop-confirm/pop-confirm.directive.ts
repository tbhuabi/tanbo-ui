import {
  Directive,
  Input,
  ElementRef,
  OnDestroy,
  ViewContainerRef,
  HostListener,
  ComponentFactoryResolver,
  ComponentFactory,
  ComponentRef
} from '@angular/core';

import { PopConfirmComponent } from './pop-confirm.component';

@Directive({
  selector: '[ui-pop-confirm]'
})
export class PopConfirmDirective implements OnDestroy {
  @Input('ui-pop-confirm')
  tooltip = '';
  @Input()
  popConfirmPosition: string = '';

  private instance: PopConfirmComponent;
  private tooltipComponent: ComponentRef<PopConfirmComponent>;
  private tooltipFactory: ComponentFactory<PopConfirmComponent>;

  private isSelfClick = false;
  private isShow = false;

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
    }
    if (this.isShow) {
      this.instance.hide();
      this.isShow = false;
      return;
    }
    this.instance.text = this.tooltip;
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
  }
}