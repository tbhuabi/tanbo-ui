import { Component, OnInit, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';

import { TooltipBaseService } from './tooltip-base.service';

@Component({
  selector: 'ui-tooltip-base',
  templateUrl: './tooltip-base.component.html'
})
export class TooltipBaseComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];

  constructor(private tooltipBaseService: TooltipBaseService,
              private elementRef: ElementRef,
              private renderer: Renderer2) {
  }

  ngOnInit() {
    this.subs.push(this.tooltipBaseService.onPush.subscribe((t: ElementRef) => {
      this.renderer.appendChild(this.elementRef.nativeElement, t.nativeElement);
    }));
  }

  ngOnDestroy() {
    this.subs.forEach(item => item.unsubscribe());
  }
}