import {
  Component,
  HostListener,
  Input,
  Output,
  EventEmitter,
  AfterContentInit,
  ContentChild,
  ElementRef,
  Renderer2
} from '@angular/core';

import { DropdownMenuComponent } from '../dropdown-menu/dropdown-menu.component';

@Component({
  selector: 'ui-dropdown',
  templateUrl: './dropdown.component.html',
  host: {
    '[class.ui-open]': 'open',
    '[class.ui-focus]': 'focus'
  }
})
export class DropdownComponent implements AfterContentInit {
  @ContentChild(DropdownMenuComponent, {static: false})
  dropdownMenu: DropdownMenuComponent;
  @Output() uiEscape = new EventEmitter();
  @Input() autoDisplay = true;

  @Input()
  set open(v: boolean) {
    this._open = v;
    this.publish();
  }

  get open() {
    return this._open;
  }

  focus = false;
  private _open = false;
  private isSelfClick = false;
  private unbindScrollFn: () => void;
  private unbindResizeFn: () => void;

  private topOrBottom = 'bottom';
  private leftOfRight = 'Left';

  constructor(private el: ElementRef<HTMLElement>,
              private renderer: Renderer2) {
  }

  ngAfterContentInit(): void {
    this.publish();
  }

  @HostListener('uiDropdownInputBlur')
  @HostListener('document:uiDropdownInputClick')
  @HostListener('document:click')
  docClick() {
    if (!this.isSelfClick && this.focus) {
      if (this.autoDisplay) {
        this.open = false;
      }
      this.focus = false;
      this.uiEscape.emit();
    }
    this.isSelfClick = false;
  }

  @HostListener('uiDropdownInputClick')
  @HostListener('click')
  click() {
    this.isSelfClick = true;
    this.focus = true;
    if (this.autoDisplay) {
      this.open = !this.open;
    }
  }

  publish() {
    if (!this.dropdownMenu) {
      return;
    }
    const childElement = this.dropdownMenu.elementRef.nativeElement;

    const fn = () => {
      const clientWidth = document.documentElement.clientWidth;
      const clientHeight = document.documentElement.clientHeight;
      const childRect = childElement.getBoundingClientRect();
      const parentRect = this.el.nativeElement.getBoundingClientRect();

      if (this.topOrBottom === 'bottom' && childRect.top + childElement.offsetHeight > clientHeight) {
        this.topOrBottom = 'top';
      } else if (this.topOrBottom === 'top' &&
        childRect.bottom + childElement.offsetHeight + this.el.nativeElement.offsetHeight < clientHeight) {
        this.topOrBottom = 'bottom';
      }

      if (this.leftOfRight === 'Left' && childRect.right > clientWidth) {
        this.leftOfRight = 'Right';
      } else if (this.leftOfRight === 'Right' && parentRect.left + childRect.offsetWidth < clientWidth) {
        this.leftOfRight = 'Left';
      }
      this.dropdownMenu.position = this.topOrBottom + this.leftOfRight;
    };
    if (this.open) {
      fn();
      if (!this.unbindResizeFn) {
        this.unbindScrollFn = this.renderer.listen('window', 'scroll', fn);
        this.unbindResizeFn = this.renderer.listen('window', 'resize', fn);
      }
    } else {
      if (this.unbindScrollFn) {
        this.unbindScrollFn();
        this.unbindResizeFn();
        this.unbindResizeFn = null;
        this.unbindScrollFn = null;
      }
    }
  }
}
