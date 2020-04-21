import {
  Component,
  HostListener,
  Input,
  Output,
  EventEmitter,
  AfterContentInit,
  ContentChild,
  ElementRef,
  Renderer2, OnInit, OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';

import { DropdownMenuComponent } from '../dropdown-menu/dropdown-menu.component';
import { attrToBoolean } from '../../utils';
import { DropdownDisplayLimit, DropdownService } from './dropdown.service';

@Component({
  selector: 'ui-dropdown',
  templateUrl: './dropdown.component.html',
  host: {
    '[class.ui-open]': 'open',
    '[class.ui-focus]': 'focus'
  },
  providers: [
    DropdownService
  ]
})
export class DropdownComponent implements AfterContentInit, OnInit, OnDestroy {
  @ContentChild(DropdownMenuComponent)
  dropdownMenu: DropdownMenuComponent;
  @Output() uiEscape = new EventEmitter();

  @Input()
  set autoDisplay(v: boolean) {
    this._autoDisplay = attrToBoolean(v);
    if (this.dropdownMenu) {
      this.dropdownMenu.autoDisplay = this._autoDisplay;
    }
  }

  get autoDisplay() {
    return this._autoDisplay;
  }

  @Input()
  set open(v: boolean) {
    this._open = v;
    this.publish();
  }

  get open() {
    return this._open;
  }

  focus = false;
  private _autoDisplay = true;
  private _open = false;
  private isSelfClick = false;
  private unbindScrollFn: () => void;
  private unbindResizeFn: () => void;

  private topOrBottom = 'bottom';
  private leftOfRight = 'left';

  private subs: Subscription[] = [];
  private displayLimit: DropdownDisplayLimit;

  constructor(private el: ElementRef<HTMLElement>,
              private dropdownService: DropdownService,
              private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.subs.push(this.dropdownService.menuClick.subscribe(() => {
      this.isSelfClick = true;
    }));
    this.subs.push(this.dropdownService.displayLimit.subscribe(v => {
      this.displayLimit = v;
      if (this.open) {
        this.updateChildDisplayLimit(v);
      }
    }));
  }

  ngAfterContentInit(): void {
    this.publish();
  }

  ngOnDestroy(): void {
    this.subs.forEach(item => item.unsubscribe());
  }

  updateChildDisplayLimit(limit: DropdownDisplayLimit) {
    if (!this.dropdownMenu) {
      return;
    }
    const width = this.el.nativeElement.offsetWidth + 'px';
    const menuElement = this.dropdownMenu.elementRef.nativeElement;
    const styles = {
      minWidth: '',
      maxWidth: '',
      width: ''
    };
    switch (limit) {
      case 'maxWidth':
        styles.maxWidth = width;
        break;
      case 'minWidth':
        styles.minWidth = width;
        break;
      case 'width':
        styles.width = width;
        break;
    }
    Object.keys(styles).forEach(key => {
      this.renderer.setStyle(menuElement, key, styles[key]);
    });
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
    this.dropdownMenu.expand = this.open;
    this.dropdownMenu.autoDisplay = this._autoDisplay;
    const menuElement = this.dropdownMenu.elementRef.nativeElement;

    const getScrollingFrame = function(node: HTMLElement) {
      if (node instanceof Element) {
        const overflow = getComputedStyle(node).overflow;
        if (overflow === 'visible' || overflow === 'hidden') {
          node = node.parentNode as HTMLElement;
          if (node) {
            return getScrollingFrame(node);
          }
        }
        return node;
      }
      return window;
    };

    const fn = () => {
      this.updateChildDisplayLimit(this.displayLimit);
      const clientWidth = document.documentElement.clientWidth;
      const clientHeight = document.documentElement.clientHeight;
      const parentRect = this.el.nativeElement.getBoundingClientRect();

      this.topOrBottom = (parentRect.bottom + Math.max(menuElement.offsetHeight, menuElement.scrollHeight) > clientHeight &&
        clientHeight - parentRect.bottom < parentRect.top) ? 'top' : 'bottom';
      this.leftOfRight = parentRect.left + menuElement.offsetWidth > clientWidth ? 'right' : 'left';
      if (this.topOrBottom === 'top') {
        this.renderer.setStyle(menuElement, 'bottom', clientHeight - parentRect.top + 'px');
        this.renderer.setStyle(menuElement, 'top', Math.max(menuElement.offsetHeight, menuElement.scrollHeight) - parentRect.top > 10 ? '10px' : '');
        this.renderer.setStyle(menuElement, 'transform-origin', '0 100%');
      } else {
        this.renderer.setStyle(menuElement, 'top', parentRect.bottom + 'px');
        this.renderer.setStyle(menuElement, 'bottom', Math.max(menuElement.offsetHeight, menuElement.scrollHeight) - (clientHeight - parentRect.bottom) > 10 ? '10px' : '');
        this.renderer.setStyle(menuElement, 'transform-origin', '0 0');
      }
      if (this.leftOfRight === 'left') {
        this.renderer.setStyle(menuElement, 'left', parentRect.left + 'px');
        this.renderer.setStyle(menuElement, 'right', '');
      } else {
        this.renderer.setStyle(menuElement, 'right', clientWidth - parentRect.right + 'px');
        this.renderer.setStyle(menuElement, 'left', '');
      }
    };
    if (this.open) {
      fn();
      if (!this.unbindResizeFn) {
        const e = getScrollingFrame(this.el.nativeElement);
        this.unbindScrollFn = this.renderer.listen(e === window ? 'window' : e, 'scroll', fn);
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
