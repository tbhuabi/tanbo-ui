import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  is = false;
  title = 'tanbo-ui';
  list: string[] = [];

  ngOnInit(): void {
    setTimeout(() => {
      this.list = ['aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff', 'ggg', 'hhh'];
    }, 2000);
  }
}
