import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayFormat = 'yyyy-MM-dd hh:mm:ss';
  format = 'yyyy-MM-dd hh:mm:ss';
  minTime = '3:30:12';
  maxTime = '10:34:34';
  minDate = '2019-6-26';
  maxDate = '';
  value = '2019-06-26';

  constructor() {
  }

  ngOnInit() {
    // const date = new Date();
    // date.setDate(date.getDate() + 2);
    // this.minDate = date;
  }

}
