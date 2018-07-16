import { Component } from '@angular/core';

@Component({
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent {
  list: any[] = ['aaa', 'bbb', 'ccc', 'ddd'];

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
