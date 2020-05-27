import {
  Component,
  Optional,
  OnInit,
  OnDestroy,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
  Renderer2, ElementRef
} from '@angular/core';
import { Subscription } from 'rxjs';

import { NavItemService } from '../nav-item/nav-item.service';
import { NavService } from './nav.service';
import { attrToBoolean, GourdBoolean } from '../../utils';

@Component({
  selector: 'ui-nav',
  templateUrl: './nav.component.html',
  providers: [
    NavService
  ]
})
export class NavComponent implements OnDestroy, OnInit, OnChanges {
  @Input()
  @HostBinding('class.ui-thumbnail')
  set thumbnail(v: any) {
    this._thumbnail = attrToBoolean(v);
    this.navService.thumbnail.next(this._thumbnail);
  }

  get thumbnail() {
    return this._thumbnail;
  }

  @HostBinding('class.ui-open')
  @Input()
  @GourdBoolean()
  expand = false;

  private _thumbnail = false;
  private sub: Subscription;

  constructor(@Optional() private navItemService: NavItemService,
              private renderer: Renderer2,
              private elementRef: ElementRef,
              private navService: NavService) {
  }

  ngOnInit() {
    if (this.navItemService) {
      this.navItemService.publishMenu(true);
      this.navItemService.changeExpandStatus(this.expand);
      this.sub = this.navItemService.expand.subscribe(b => {
        this.expand = b;
        this.update();
      });
    } else {
      this.expand = true;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    Object.keys(changes).forEach(key => {
      if (key === 'expand') {
        this.update();
      }
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.navItemService.publishMenu(false);
      this.sub.unsubscribe();
    }
  }

  private update() {
    const el = this.elementRef.nativeElement;
    if (this.expand) {
      this.renderer.setStyle(el, 'height', 'auto');
    } else {
      this.renderer.setStyle(el, 'height', '0');
    }
  }
}
