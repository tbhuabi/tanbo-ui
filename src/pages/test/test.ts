import {
  Component,
  OnInit,
} from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Component({
  templateUrl: './test.html',
  styleUrls: ['./test.scss']
})
export class TestComponent implements OnInit {
  private active: number = 0;

  constructor(public http: HttpClient) {
  }

  ngOnInit() {
  }
  next() {
    this.active = this.active < 4 ? this.active + 1 : 0;
    console.log(this.active);
  }
}