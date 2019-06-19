import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  is = localStorage.getItem('open') === 'true';
  title = 'tanbo-ui';
  list: string[] = ['aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff', 'ggg', 'hhh'];

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.list = ['aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff', 'ggg', 'hhh'];
    // }, 2000);
  }

  change(b: boolean) {
    localStorage.setItem('open', b + '');
  }
}
