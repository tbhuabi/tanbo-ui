import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'input[ui-input],textarea[ui-input]',
  host: {
    '[class.ui-form-control]': 'true',
    '[class.ui-input-sm]': 'size === "sm"',
    '[class.ui-input-lg]': 'size === "lg"'
  }
})
export class InputDirective {
  @Input() size: string;
}