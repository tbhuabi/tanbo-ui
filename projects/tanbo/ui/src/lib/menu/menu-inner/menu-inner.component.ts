import {
  Component,
  Optional,
  HostListener,
  OnInit,
  Input,
  OnDestroy,
  ElementRef,
  Renderer2,
  ContentChildren,
  AfterContentInit,
  OnChanges,
  QueryList,
  Inject,
  HostBinding
} from '@angular/core';
import { Router, RouterLink, RouterLinkWithHref, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

import { MenuItemService } from '../menu-item/menu-item.service';
import { UI_MENU_OFFSET, UI_MENU_DEPTH } from '../config';

@Component({
  selector: 'ui-menu-inner',
  templateUrl: './menu-inner.component.html'
})
export class MenuInnerComponent implements OnDestroy, OnInit, OnChanges, AfterContentInit {
  @HostBinding('class.ui-open')
  isOpen = false;

  @HostBinding('style.paddingLeft')
  get paddingLeft() {
    return this.depth * 2 + 0.5 + this.offset + 'em';
  }

  @ContentChildren(RouterLink, {descendants: true})
  links: QueryList<RouterLink>;
  @ContentChildren(RouterLinkWithHref, {descendants: true})
  linksWithHrefs: QueryList<RouterLinkWithHref>;
  @Input()
  routerLinkActiveOptions: { exact: boolean } = {exact: false};

  totalMenu = 0;
  readonly isActive: boolean = false;

  private classes: string[] = ['ui-active'];
  private subs: Subscription[] = [];

  constructor(@Optional() private menuItemService: MenuItemService,
              @Inject(UI_MENU_DEPTH) public depth: number,
              @Inject(UI_MENU_OFFSET) private offset: number,
              private router: Router,
              private element: ElementRef,
              private renderer: Renderer2) {

  }

  ngOnInit() {
    this.subs.push(this.router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        this.update();
      }
    }));
    if (this.menuItemService) {
      this.subs.push(this.menuItemService.isOpen.subscribe(b => {
        this.isOpen = b;
      }));
      this.subs.push(this.menuItemService.hasMenu.subscribe(b => {
        if (b) {
          this.totalMenu++;
        } else {
          this.totalMenu--;
        }
      }));
    }
  }

  ngOnDestroy() {
    this.subs.forEach(item => item.unsubscribe());
  }

  @HostListener('click')
  click() {
    if (this.menuItemService) {
      this.menuItemService.change(!this.isOpen);
    }
  }

  ngAfterContentInit(): void {
    this.links.changes.subscribe(_ => this.update());
    this.linksWithHrefs.changes.subscribe(_ => this.update());
    this.update();
    if (this.menuItemService) {
      this.menuItemService.change(this.isActive);
    }
  }

  ngOnChanges() {
    this.update();
  }

  private update(): void {
    if (!this.links || !this.linksWithHrefs || !this.router.navigated) return;
    const hasActiveLinks = this.hasActiveLinks();

    if (this.isActive !== hasActiveLinks) {
      this.classes.forEach((c) => {
        if (hasActiveLinks) {
          this.renderer.addClass(this.element.nativeElement, c);
        } else {
          this.renderer.removeClass(this.element.nativeElement, c);
        }
      });
      Promise.resolve(hasActiveLinks).then(active => {
        (this as {
          isActive: boolean
        }).isActive = active;
        if (this.menuItemService.parent && active) {
          this.menuItemService.parent.change(active);
        }
      });
    }
  }

  private isLinkActive(router: Router): (link: (RouterLink | RouterLinkWithHref)) => boolean {
    return (link: RouterLink | RouterLinkWithHref) =>
        router.isActive(link.urlTree, this.routerLinkActiveOptions.exact);
  }

  private hasActiveLinks(): boolean {
    return this.links.some(this.isLinkActive(this.router)) ||
        this.linksWithHrefs.some(this.isLinkActive(this.router));
  }
}