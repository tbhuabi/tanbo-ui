import {
  Component,
} from '@angular/core';
import { Observable, of } from 'rxjs/index';

@Component({
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent {

  uploader: Observable<string> = of('https://www.tanboui.com/static/img/logo2.558fcff8d5b49909b4db53f3ca66e823.png');
}