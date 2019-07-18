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

import { DropdownMenuComponent } from '../dropdown-menu/dropdown-menu.component';
import { attrToBoolean } from '../../utils';
import { DropdownService } from './dropdown.service';
import { Subscription } from 'rxjs';

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
  @ContentChild(DropdownMenuComponent, {static: false})
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

  private sub: Subscription;

  constructor(private el: ElementRef<HTMLElement>,
              private dropdownService: DropdownService,
              private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.sub = this.dropdownService.menuClick.subscribe(() => {
      this.isSelfClick = true;
    });
  }

  ngAfterContentInit(): void {
    this.publish();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
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
    const childElement = this.dropdownMenu.elementRef.nativeElement;

    const fn = () => {
      const clientWidth = document.documentElement.clientWidth;
      const clientHeight = document.documentElement.clientHeight;
      const parentRect = this.el.nativeElement.getBoundingClientRect();

      this.topOrBottom = parentRect.bottom + childElement.offsetHeight > clientHeight ? 'top' : 'bottom';
      this.leftOfRight = parentRect.left + childElement.offsetWidth > clientWidth ? 'right' : 'left';
      if (this.topOrBottom === 'top') {
        this.renderer.setStyle(childElement, 'bottom', clientHeight - parentRect.top + 'px');
        this.renderer.setStyle(childElement, 'top', '');
        this.renderer.setStyle(childElement, 'transform-origin', '0 100%');
      } else {
        this.renderer.setStyle(childElement, 'top', parentRect.bottom + 'px');
        this.renderer.setStyle(childElement, 'bottom', '');
        this.renderer.setStyle(childElement, 'transform-origin', '0 0');
      }
      if (this.leftOfRight === 'left') {
        this.renderer.setStyle(childElement, 'left', parentRect.left + 'px');
        this.renderer.setStyle(childElement, 'right', '');
      } else {
        this.renderer.setStyle(childElement, 'right', clientWidth - parentRect.right + 'px');
        this.renderer.setStyle(childElement, 'left', '');
      }
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
