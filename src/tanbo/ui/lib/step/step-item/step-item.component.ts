import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'ui-step-item',
  templateUrl: './step-item.component.html'
})
export class StepItemComponent {
  public index: number = 0;
  public isLast: boolean = false;
  private _isSuccess: boolean = false;
  private _maxWidth: string = '50%';
  private _isWaiting: boolean = false;
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

  @HostBinding('class.is-waiting')
  get isWaiting() {
    return this._isWaiting;
  }
  set isWaiting(status: boolean) {
    this._isWaiting = status;
  }
}