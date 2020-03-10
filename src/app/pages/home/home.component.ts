import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data: Array<{ label: string, value: string }> = [];

  ngOnInit(): void {
    setTimeout(() => {
      this.data = [{
        label: 'a',
        value: 'a'
      }, {
        label: 'b',
        value: 'b'
      }];
    });
  }
}
