import { Component, ElementRef, HostListener, ViewChild, Input, Output, AfterViewInit, HostBinding, OnDestroy } from '@angular/core';

@Component({
  selector: 'ui-scroll',
  templateUrl: './scroll.component.html'
})
export class ScrollComponent implements AfterViewInit, OnDestroy {
  @Input() scrollTop = 0;
  @Input() scrollLeft = 0;
  @HostBinding('class.ui-overflow-x')
  @Input() overflowX = false;
  @HostBinding('class.ui-overflow-y')
  @Input() overflowY = true;
  @ViewChild('content', {static: true}) content: ElementRef;
  @Input() scrollBarMinLength = 50;

  scrollYBarLength: number;
  scrollXBarLength: number;

  get transform() {
    return `translateX(${this.transformX}px) translateY(${this.transformY}px)`;
  }

  private transformX = 0;
  private transformY = 0;
  private topDistance = 0;
  private leftDistance = 0;
  private containerWidth: number;
  private containerHeight: number;
  private contentWidth: number;
  private contentHeight: number;

  private maxScrollHeight: number;
  private maxScrollWidth: number;

  private animateId: number;

  constructor(private elementRef: ElementRef) {
  }

  @HostListener('mouseenter')
  mouseEnter() {
    const containerElement = this.elementRef.nativeElement;
    const contentElement = this.content.nativeElement;
    const fn = () => {
      this.containerHeight = containerElement.offsetHeight;
      this.containerWidth = containerElement.offsetWidth;
      this.contentHeight = contentElement.offsetHeight;
      this.contentWidth = contentElement.offsetWidth;
      this.maxScrollHeight = this.containerHeight - this.contentHeight;
      this.maxScrollWidth = this.containerWidth - this.contentWidth;
      this.animateId = requestAnimationFrame(fn);
    };
    fn();
    this.setScrollBar();
  }

  @HostListener('mouseleave')
  mouseLeave() {
    if (this.animateId) {
      cancelAnimationFrame(this.animateId);
    }
  }

  @HostListener('mousewheel', ['$event'])
  scroll(event: WheelEvent) {
    if (this.overflowY) {
      this.transformY = this.transformY - event.deltaY;
      const maxScrollHeight = this.maxScrollHeight;
      if (this.transformY > 0) {
        this.transformY = 0;
      } else if (this.transformY < maxScrollHeight) {
        this.transformY = maxScrollHeight;
      } else {
        event.preventDefault();
      }
      this.setScrollBar();
    }
    if (this.overflowX) {
      this.transformX = this.transformX - event.deltaX;
      const maxScrollWidth = this.maxScrollWidth;
      if (this.transformX > 0) {
        this.transformX = 0;
      } else if (this.transformX < maxScrollWidth) {
        this.transformX = maxScrollWidth;
      } else {
        event.preventDefault();
      }
    }
  }

  setScrollBar() {
    if (this.overflowY) {
      const y = this.containerHeight / this.contentHeight;
      if (y < 1) {
        const scrollYBarLength = y * this.containerHeight;
        this.scrollYBarLength = scrollYBarLength < this.scrollBarMinLength ? this.scrollBarMinLength : scrollYBarLength;
        this.topDistance = (this.containerHeight - this.scrollYBarLength) * (this.transformY / this.maxScrollHeight);
        console.log(this.containerHeight, this.scrollYBarLength, this.transformY, this.maxScrollHeight);
      }
    }
    if (this.overflowX) {
      const x = this.containerWidth / this.contentWidth;
      if (x < 1) {
        const scrollXBarLength = x * this.containerWidth;
        this.scrollYBarLength = scrollXBarLength < this.scrollBarMinLength ? this.scrollYBarLength : scrollXBarLength;
      }
    }
  }

  ngAfterViewInit(): void {
    this.setupScrollContainer();
  }

  ngOnDestroy(): void {
    if (this.animateId) {
      cancelAnimationFrame(this.animateId);
    }
  }

  setupScrollContainer() {

  }
}
