import { Component, Input, HostListener, ElementRef, OnInit, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { Subscription } from 'rxjs';

import { AnchorService } from './anchor.service';
import { UI_ANCHOR_LINK_DISTANCE } from '../helper';

@Component({
  /*tslint:disable*/
  selector: '[ui-anchor]',
  /*tslint:enable*/
  templateUrl: './anchor.component.html',
  host: {
    '[class.ui-anchor]': 'true'
  }
})
export class AnchorComponent implements OnInit, OnDestroy {
  @Input() id = '';
  @Input() name = '';
  @Input() offset = 0;

  params: any = {};
  queryParams: any = {};

  private hashChangeIsFromSelf = false;

  private scrollObs: Observable<string>;
  private scrollEvent = new Subject<string>();
  private subs: Subscription[] = [];

  constructor(private elementRef: ElementRef,
              @Inject(UI_ANCHOR_LINK_DISTANCE) private _offset: number,
              private anchorService: AnchorService,
              private activatedRoute: ActivatedRoute) {
    this.offset = _offset;
    this.scrollObs = this.scrollEvent.asObservable();
  }

  ngOnInit() {
    this.subs.push(this.activatedRoute.params.subscribe(p => {
      this.params = p;
    }), this.activatedRoute.queryParams.subscribe(p => {
      this.queryParams = p;
    }), this.activatedRoute.fragment.subscribe(str => {
      this.hashChangeIsFromSelf = true;
      if (str === this.id || str === this.name) {
        this.elementRef.nativeElement.scrollIntoView();
        requestAnimationFrame(() => {
          document.documentElement.scrollTop -= this.offset;
        });
      }
      setTimeout(() => {
        this.hashChangeIsFromSelf = false;
      }, 400);
    }));
  }

  ngOnDestroy() {
    this.subs.forEach(item => item.unsubscribe());
  }

  @HostListener('window:scroll')
  scroll() {
    const distance = this.elementRef.nativeElement.getBoundingClientRect();
    if (distance.top < 100 && !this.hashChangeIsFromSelf) {
      this.anchorService.anchorIn(this.id || this.name);
    }
  }
}