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
  HostBinding
} from '@angular/core';
import { Router, RouterLink, RouterLinkWithHref, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

import { NavItemService } from '../nav-item/nav-item.service';

@Component({
  selector: 'ui-nav-inner,a[ui-nav-inner]',
  templateUrl: './nav-inner.component.html'
})
export class NavInnerComponent implements OnDestroy, OnInit, OnChanges, AfterContentInit {
  @HostBinding('class.ui-open')
  get isOpenNext() {
    return this.isOpen && this.totalMenu > 0;
  }

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

  constructor(@Optional() private navItemService: NavItemService,
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
    if (this.navItemService) {
      this.subs.push(this.navItemService.isOpen.subscribe(b => {
        this.isOpen = b;
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
  }

  ngOnDestroy() {
    this.subs.forEach(item => item.unsubscribe());
  }

  @HostListener('click')
  click() {
    if (this.navItemService) {
      this.navItemService.change(!this.isOpen);
    }
  }

  ngAfterContentInit(): void {
    this.links.changes.subscribe(_ => this.update());
    this.linksWithHrefs.changes.subscribe(_ => this.update());
    this.update();
    if (this.navItemService) {
      this.navItemService.change(this.isActive);
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
        if (this.navItemService.parent && active) {
          this.navItemService.parent.change(active);
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