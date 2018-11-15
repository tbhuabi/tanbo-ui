import {
  Component,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './test.html',
  styleUrls: ['./test.scss']
})
export class TestComponent {
  bool: boolean = false;
  private activeIndex: number = 0;
  constructor(public http: HttpClient) {
    setTimeout(() => {
      this.bool = true;
    }, 3000);
  }
  next() {
    this.activeIndex = this.activeIndex < 4 ? this.activeIndex + 1 : 0;
  }
}