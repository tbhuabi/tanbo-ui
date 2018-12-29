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

import { TooltipComponent } from './tooltip.component';

@Directive({
  selector: '[uiTooltip]'
})
export class TooltipDirective implements OnDestroy {
  @Input('ui-tooltip')
  tooltip = '';
  @Input()
  tooltipPosition: string = '';

  private instance: TooltipComponent;
  private tooltipComponent: ComponentRef<TooltipComponent>;
  private tooltipFactory: ComponentFactory<TooltipComponent>;

  constructor(private elementRef: ElementRef,
              private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef) {
  }

  @HostListener('mouseenter')
  mouseEnter() {
    if (!this.instance) {
      this.tooltipFactory = this.componentFactoryResolver.resolveComponentFactory(TooltipComponent);
      this.tooltipComponent = this.viewContainerRef.createComponent(this.tooltipFactory);
      this.instance = this.tooltipComponent.instance;
    }
    this.instance.text = this.tooltip;
    this.instance.referenceElement = this.elementRef.nativeElement;
    this.instance.position = this.tooltipPosition;
    this.instance.show();
  }

  @HostListener('mouseleave')
  mouseLeave() {
    if (this.instance) {
      this.instance.hide();
    }
  }

  ngOnDestroy() {
    if (this.instance) {
      this.tooltipComponent.destroy();
    }
  }
}