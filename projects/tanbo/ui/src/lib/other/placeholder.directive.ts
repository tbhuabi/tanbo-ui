import { Directive, OnDestroy, ElementRef, AfterViewInit, Renderer2, Input } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'input[placeholder]'
})

export class PlaceholderDirective implements AfterViewInit, OnDestroy {
  @Input()
  set placeholder(val: string) {
    this._placeholder = val;
    if (this.shadowEle) {
      this.shadowEle.innerText = this.elementRef.nativeElement.value ? '' : val;
    }
  }

  get placeholder() {
    return this._placeholder;
  }

  private shadowEle: HTMLElement;
  private _placeholder: string;
  private unbind: Array<() => void> = [];
  private inputStyles: any;

  constructor(private elementRef: ElementRef,
              private renderer2: Renderer2) {
  }

  ngAfterViewInit() {
    if (/msie\s9\.0/i.test(navigator.userAgent)) {
      const input = this.elementRef.nativeElement;
      const shadowEle = document.createElement('div');
      const shadowEleInner = document.createElement('div');
      this.shadowEle = shadowEle;
      const inputStyles = getComputedStyle(input);
      this.inputStyles = inputStyles;
      const shadowEleStyles = {
        position: 'absolute',
        width: input.offsetWidth + 'px',
        height: input.offsetHeight + 'px',
        paddingLeft: inputStyles.paddingLeft,
        paddingTop: inputStyles.paddingTop,
        paddingRight: inputStyles.paddingRight,
        paddingBottom: inputStyles.paddingBottom,
        zIndex: 0,
        borderTopLeftRadius: inputStyles.borderTopLeftRadius,
        borderTopRightRadius: inputStyles.borderTopRightRadius,
        borderBottomRightRadius: inputStyles.borderBottomRightRadius,
        borderBottomLeftRadius: inputStyles.borderBottomLeftRadius,
        fontSize: inputStyles.fontSize,
        color: 'rgb(117, 117, 117)',
        'background-color': inputStyles.backgroundColor,
        'line-height': inputStyles.lineHeight,
        'vertical-align': inputStyles.verticalAlign,
        'white-space': 'nowrap',
        left: input.offsetLeft + 'px',
        top: input.offsetTop + 'px',
        'box-sizing': 'border-box'
      };


      shadowEle.style.cssText = Object.keys(shadowEleStyles)
        .map((key) => `${key.replace(/[A-Z]/g, s => '-' + s.toLocaleLowerCase())}:${shadowEleStyles[key]}`).join(';');
      input.style.backgroundColor = 'transparent';
      shadowEleInner.style.overflow = 'hidden';

      shadowEle.appendChild(shadowEleInner);
      input.parentNode.insertBefore(shadowEle, input);

      shadowEleInner.innerText = input.value ? '' : this.placeholder;
      this.unbind.push(this.renderer2.listen(input, 'keyup', () => {
        shadowEleInner.innerText = input.value ? '' : this.placeholder;
      }));
      this.unbind.push(this.renderer2.listen(input, 'input', () => {
        shadowEleInner.innerText = input.value ? '' : this.placeholder;
      }));
    }
  }

  ngOnDestroy() {
    if (this.unbind.length) {
      const elementRef = this.elementRef.nativeElement;
      elementRef.parentNode.removeChild(this.shadowEle);
      elementRef.style.cssText = this.inputStyles;
      this.unbind.forEach(fn => fn());
    }
  }
}
