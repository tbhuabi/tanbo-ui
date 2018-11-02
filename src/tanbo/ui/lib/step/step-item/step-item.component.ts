import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'ui-step-item',
  templateUrl: './step-item.component.html'
})
export class StepItemComponent {
  public index: number = 0;
  public isLast: boolean = false;
  private _isSuccess: boolean = false;
  private _maxWidth: string = '50%';

  @HostBinding('style.maxWidth')
  get maxWidth() {
    return this._maxWidth;
  }
  set maxWidth(width: string) {
    this._maxWidth = width;
  }

  @HostBinding('class.is-success')
  get isSuccess() {
    return this._isSuccess;
  }
  set isSuccess(status: boolean) {
    this._isSuccess = status;
  }
}