import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  Input,
  Output,
  AfterViewInit,
  HostBinding,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'ui-scroll',
  templateUrl: './scroll.component.html'
})
export class ScrollComponent implements AfterViewInit, OnDestroy {
  @HostBinding('class.ui-overflow-x')
  @Input() overflowX = false;
  @HostBinding('class.ui-overflow-y')
  @Input() overflowY = true;
  @ViewChild('content', {static: true}) content: ElementRef;
  @Input() scrollBarMinLength = 50;

  @Input()
  set scrollTop(v: number) {
    if (v < 0) {
      this._scrollTop = 0;
    } else if (v > this.maxScrollHeight) {
      this._scrollTop = this.maxScrollHeight;
    } else {
      this._scrollTop = v;
    }
  }

  get scrollTop() {
    return this._scrollTop;
  }

  @Input()
  set scrollLeft(v: number) {
    if (v < 0) {
      this._scrollLeft = 0;
    } else if (v > this.maxScrollWidth) {
      this._scrollLeft = this.maxScrollWidth;
    } else {
      this._scrollLeft = v;
    }
  }

  get scrollLeft() {
    return this._scrollLeft;
  }

  scrollYBarLength: number;
  scrollXBarLength: number;

  get transform() {
    return `translateX(${-this.scrollLeft}px) translateY(${-this.scrollTop}px)`;
  }

  private _scrollLeft = 0;
  private _scrollTop = 0;

  private topDistance = 0;
  private leftDistance = 0;
  private containerWidth: number;
  private containerHeight: number;
  private contentWidth: number;
  private contentHeight: number;

  private maxScrollHeight = 0;
  private maxScrollWidth = 0;

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
      this.maxScrollHeight = this.contentHeight - this.containerHeight;
      this.maxScrollWidth = this.contentWidth - this.containerWidth;
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
      const scrollTop = this.scrollTop + event.deltaY;
      this.scrollTop = scrollTop;
      if (scrollTop >= 0 && scrollTop <= this.maxScrollHeight) {
        event.preventDefault();
      }
      this.setScrollBar();
    }
    if (this.overflowX) {
      const scrollLeft = this.scrollLeft - event.deltaX;
      this.scrollLeft = scrollLeft;
      if (scrollLeft >= 0 && scrollLeft <= this.maxScrollWidth) {
        event.preventDefault();
      }
      this.setScrollBar();
    }
  }

  setScrollBar() {
    if (this.overflowY) {
      const y = this.containerHeight / this.contentHeight;
      if (y < 1) {
        const scrollYBarLength = y * this.containerHeight;
        this.scrollYBarLength = scrollYBarLength < this.scrollBarMinLength ? this.scrollBarMinLength : scrollYBarLength;
        this.topDistance = (this.containerHeight - this.scrollYBarLength) * (this.scrollTop / this.maxScrollHeight);
      }
    }
    if (this.overflowX) {
      const x = this.containerWidth / this.contentWidth;
      if (x < 1) {
        const scrollXBarLength = x * this.containerWidth;
        this.scrollXBarLength = scrollXBarLength < this.scrollBarMinLength ? this.scrollBarMinLength : scrollXBarLength;
        this.leftDistance = (this.containerWidth - this.scrollXBarLength) * (this.scrollLeft / this.maxScrollWidth);
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
