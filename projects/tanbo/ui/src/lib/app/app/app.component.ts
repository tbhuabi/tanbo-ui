import { Component, ElementRef, ViewChild } from '@angular/core';

import { DropdownRenderer } from '../../dropdown/help';

@Component({
  selector: 'ui-app',
  templateUrl: './app.component.html',
  providers: [{
    provide: DropdownRenderer,
    useClass: AppComponent
  }]
})
export class AppComponent implements DropdownRenderer {
  constructor(private elementRef: ElementRef<HTMLElement>) {
  }

  renderDropdown(ref: ElementRef): void {
    this.elementRef.nativeElement.appendChild(ref.nativeElement);
  }
}
