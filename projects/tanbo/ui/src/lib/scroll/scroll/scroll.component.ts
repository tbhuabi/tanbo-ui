import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  Input,
  Output,
  HostBinding,
  OnDestroy, EventEmitter
} from '@angular/core';

export interface UIScrollEvent {
  scrollLeft: number;
  scrollTop: number;
  srcEvent: WheelEvent;
}

@Component({
  selector: 'ui-scroll',
  templateUrl: './scroll.component.html'
})
export class ScrollComponent implements OnDestroy {
  @Output() uiScroll = new EventEmitter<UIScrollEvent>();
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

  topDistance = 0;
  leftDistance = 0;

  private _scrollLeft = 0;
  private _scrollTop = 0;
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
      this.setScrollBar();
      this.animateId = requestAnimationFrame(fn);
    };
    fn();
  }

  @HostListener('mouseleave')
  mouseLeave() {
    if (this.animateId) {
      cancelAnimationFrame(this.animateId);
    }
  }

  @HostListener('wheel', ['$event'])
  scroll(event: WheelEvent) {
    if (this.overflowY) {
      const scrollTop = this.scrollTop + event.deltaY;
      this.scrollTop = scrollTop;
      if (scrollTop >= 0 && scrollTop <= this.maxScrollHeight) {
        this.uiScroll.emit({
          scrollLeft: this.scrollLeft,
          scrollTop: this.scrollTop,
          srcEvent: event
        });
        event.preventDefault();
      }
      this.setScrollBar();
    }
    if (this.overflowX) {
      const scrollLeft = this.scrollLeft - event.deltaX;
      this.scrollLeft = scrollLeft;
      if (scrollLeft >= 0 && scrollLeft <= this.maxScrollWidth) {
        this.uiScroll.emit({
          scrollLeft: this.scrollLeft,
          scrollTop: this.scrollTop,
          srcEvent: event
        });
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
      } else {
        this.scrollYBarLength = 0;
      }
    }
    if (this.overflowX) {
      const x = this.containerWidth / this.contentWidth;
      if (x < 1) {
        const scrollXBarLength = x * this.containerWidth;
        this.scrollXBarLength = scrollXBarLength < this.scrollBarMinLength ? this.scrollBarMinLength : scrollXBarLength;
        this.leftDistance = (this.containerWidth - this.scrollXBarLength) * (this.scrollLeft / this.maxScrollWidth);
      } else {
        this.scrollXBarLength = 0;
      }
    }
  }
  ngOnDestroy(): void {
    if (this.animateId) {
      cancelAnimationFrame(this.animateId);
    }
  }
}
