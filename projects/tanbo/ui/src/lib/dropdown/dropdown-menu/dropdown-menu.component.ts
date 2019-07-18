import { Component, ElementRef, HostBinding, HostListener, Inject, OnInit, SkipSelf } from '@angular/core';

import { DropdownRenderer } from '../help';
import { UI_OVERLAY_Z_INDEX } from '../../base/help';
import { DropdownService } from '../dropdown/dropdown.service';

export function dropdownZIndexFactory(zIndex: number) {
  return zIndex + 10;
}

@Component({
  selector: 'ui-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  host: {
    '[class.ui-open]': 'expand'
  },
  providers: [{
    provide: UI_OVERLAY_Z_INDEX,
    useFactory: dropdownZIndexFactory,
    deps: [[UI_OVERLAY_Z_INDEX, new SkipSelf()]]
  }],
})
export class DropdownMenuComponent implements OnInit {
  @HostBinding('style.zIndex')
  zIndex: number;
  expand = false;
  autoDisplay = true;

  constructor(public elementRef: ElementRef,
              @Inject(UI_OVERLAY_Z_INDEX) zIndex: number,
              private dropdownService: DropdownService,
              private renderer: DropdownRenderer) {
    this.zIndex = zIndex;
  }

  ngOnInit(): void {
    this.renderer.renderDropdown(this.elementRef);
  }

  @HostListener('click')
  click() {
    if (!this.autoDisplay) {
      this.dropdownService.click();
    }
  }
}
