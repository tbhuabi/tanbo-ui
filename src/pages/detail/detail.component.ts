import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { DetailService } from './detail.service';

@Component({
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  providers: [
    DetailService
  ]
})
export class DetailComponent {
  date = '';

  show() {
    console.log(this.date);
  }

  change() {
    this.date = '';
  }
}