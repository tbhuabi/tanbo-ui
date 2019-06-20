import {
  Component,
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
  Attribute,
  HostBinding
} from '@angular/core';
import { Router, RouterLink, RouterLinkWithHref, NavigationEnd } from '@angular/router';
import { ENTER } from '@angular/cdk/keycodes';
import { Subscription } from 'rxjs';

import { NavItemService } from '../nav-item/nav-item.service';
import { NavService } from '../nav/nav.service';

@Component({
  selector: 'ui-nav-inner,a[uiNavInner]',
  templateUrl: './nav-inner.component.html',
  host: {
    '[attr.tabindex]': 'tabIndex || 0',
    '[class.ui-nav-inner]': 'true'
  }
})
export class NavInnerComponent implements OnDestroy, OnInit, OnChanges, AfterContentInit {
  @HostBinding('class.ui-open')
  get isOpenNext() {
    return this.isOpen && this.totalMenu > 0 && !this.isThumbnail;
  }

  @HostBinding('class.ui-child-link-active')
  get isHighLight() {
    return this.childLinkActive && this.isThumbnail && this.totalMenu > 0;
  }

  @HostBinding('class.ui-thumbnail')
  isThumbnail = false;
  isOpen = false;

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
  private childLinkActive = false;

  constructor(private navItemService: NavItemService,
              /*tslint:disable*/
              @Attribute('tabindex') public tabIndex: string,
              /*tslint:enable*/
              private navService: NavService,
              private router: Router,
              private element: ElementRef,
              private renderer: Renderer2) {
  }

  ngOnInit() {
    this.subs.push(this.navService.thumbnail.subscribe(b => {
      this.isThumbnail = b;
    }));
    this.subs.push(this.router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        this.update();
      }
    }));
    this.subs.push(this.navItemService.expand.subscribe(b => {
      this.isOpen = b;
    }));
    this.subs.push(this.navItemService.linksActive.subscribe(b => {
      this.childLinkActive = b;
    }));
    this.subs.push(this.navItemService.hasMenu.subscribe(b => {
      if (b) {
        this.totalMenu++;
      } else {
        this.totalMenu--;
        if (this.totalMenu < 0) {
          this.totalMenu = 0;
        }
      }
    }));
  }

  ngOnDestroy() {
    this.subs.forEach(item => item.unsubscribe());
  }

  @HostListener('focus')
  focus() {
    this.navItemService.expandParent();
  }

  @HostListener('keydown', ['$event'])
  keyDown(ev: KeyboardEvent) {
    if (ev.keyCode === ENTER) {
      this.click();
    }
  }

  @HostListener('click')
  click() {
    if (this.isThumbnail) {
      this.navItemService.changeExpandStatus(true);
    } else {
      this.navItemService.changeExpandStatus(!this.isOpen);
    }
  }

  ngAfterContentInit(): void {
    this.links.changes.subscribe(() => this.update());
    this.linksWithHrefs.changes.subscribe(() => this.update());
    this.update();
  }

  ngOnChanges() {
    this.update();
  }

  private update(): void {
    if (!this.links || !this.linksWithHrefs || !this.router.navigated) {
      return;
    }
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
