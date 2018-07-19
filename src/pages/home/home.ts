import { Component } from '@angular/core';

@Component({
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent {
  value = 'bbb';
  list: any[] = [];

  constructor() {
    setTimeout(() => {
      this.list = ['aaa', 'bbb', 'ccc', 'ddd'];
    }, 2000);
  }

  show(v: any) {
    console.log(v);
  }

  add() {
    this.list.push(Math.random());
  }

  remove(i: number) {
    this.list.splice(i, 1);
  }
}
