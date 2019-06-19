import {
  Component,
  OnDestroy,
  OnInit,
  HostBinding,
  HostListener,
  ContentChildren, QueryList, AfterContentInit, OnChanges, ElementRef
} from '@angular/core';
import { Subscription } from 'rxjs';

import { NavItemService } from './nav-item.service';
import { NavService } from '../nav/nav.service';
import { NavigationEnd, Router, RouterLink, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'ui-nav-item',
  templateUrl: './nav-item.component.html',
  providers: [
    NavItemService
  ]
})
export class NavItemComponent implements OnInit, AfterContentInit, OnChanges, OnDestroy {
  @HostBinding('class.ui-thumbnail')
  isThumbnail = false;
  @ContentChildren(RouterLink, {descendants: true})
  links: QueryList<RouterLink>;
  @ContentChildren(RouterLinkWithHref, {descendants: true})
  linksWithHrefs: QueryList<RouterLinkWithHref>;

  private subs: Subscription[] = [];

  constructor(private navService: NavService,
              private navItemService: NavItemService,
              private el: ElementRef,
              private router: Router) {
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
  }

  ngOnDestroy() {
    this.subs.forEach(item => item.unsubscribe());
  }

  @HostListener('mouseenter')
  mouseEnter() {
    if (this.isThumbnail) {
      this.navItemService.changeExpandStatus(true);
    }
  }

  @HostListener('mouseleave')
  mouseLeave() {
    if (this.isThumbnail) {
      this.navItemService.changeExpandStatus(false);
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
    this.navItemService.publishLinkActiveStatus(hasActiveLinks);
    if (!this.isThumbnail && hasActiveLinks) {
      this.navItemService.changeExpandStatus(hasActiveLinks);
    }
  }

  private isLinkActive(router: Router): (link: (RouterLink | RouterLinkWithHref)) => boolean {
    return (link: RouterLink | RouterLinkWithHref) =>
      router.isActive(link.urlTree, false);
  }

  private hasActiveLinks(): boolean {
    return this.links.some(this.isLinkActive(this.router)) ||
      this.linksWithHrefs.some(this.isLinkActive(this.router));
  }
}
