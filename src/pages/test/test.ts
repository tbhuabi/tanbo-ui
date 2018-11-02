import {
  Component,
} from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Component({
  templateUrl: './test.html',
  styleUrls: ['./test.scss']
})
export class TestComponent {
  private active: number = 0;

  constructor(public http: HttpClient) {
  }
  next() {
    this.active = this.active < 4 ? this.active + 1 : 0;
    console.log(this.active);
  }
}