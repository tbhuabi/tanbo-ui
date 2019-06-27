import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  minDate = new Date();
  displayFormat = 'yyyy-MM-dd hh:mm:ss';
  // displayFormat = 'hh:mm:ss';
  value = new Date();
  constructor() {
  }

  ngOnInit() {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    this.minDate = date;
  }

}
