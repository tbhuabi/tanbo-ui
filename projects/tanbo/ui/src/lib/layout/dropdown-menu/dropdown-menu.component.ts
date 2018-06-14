import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'ui-dropdown-menu',
  templateUrl: './dropdown-menu.component.html'
})
export class DropdownMenuComponent {
  @HostListener('click', ['$event'])
  click(event: any) {
    event.stopPropagation();
  }
}