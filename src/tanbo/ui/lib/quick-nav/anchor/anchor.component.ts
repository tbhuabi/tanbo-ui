import { Component, Input, HostListener, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { AnchorService } from './anchor.service';

@Component({
  /*tslint:disable*/
  selector: '[ui-anchor]',
  /*tslint:enable*/
  templateUrl: './anchor.component.html',
  host: {
    '[class.ui-anchor]': 'true'
  }
})
export class AnchorComponent implements OnInit {
  @Input()
  id = '';
  @Input()
  name = '';
  @Input()
  offset = 0;

  private hashChangeIsFromSelf = false;

  private scrollObs: Observable<string>;
  private scrollEvent = new Subject<string>();

  constructor(private elementRef: ElementRef,
              private router: Router,
              private anchorService: AnchorService,
              private activatedRoute: ActivatedRoute) {
    this.scrollObs = this.scrollEvent.asObservable();
  }

  ngOnInit() {
    this.activatedRoute.fragment.subscribe(str => {
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
    });
  }

  @HostListener('window:scroll')
  scroll() {
    const distance = this.elementRef.nativeElement.getBoundingClientRect();
    if (distance.top < 100 && !this.hashChangeIsFromSelf) {
      this.anchorService.anchorIn(this.id || this.name);
    }
  }
}