import {
  Component,
  OnInit,
  Compiler,
  Injector,
  ViewChild,
  ViewContainerRef,
  NgModuleRef
} from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Component({
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit {
  constructor(public http: HttpClient) {
  }

  ngOnInit() {
    // this.http.post('/login', {
    //   username: 'admin',
    //   password: '123456'
    // }).subscribe(b => {
    //   // console.log(b);
    // });
  }

  provide = (data: FormData) => {
    // return this.http.post('/api/v1/files/attachments', data, {
    //   observe: 'response',
    //   reportProgress: true
    // });
    return new HttpRequest('POST', '/api/v1/files/attachments', data, {
      reportProgress: true
    });
  };

  uploaded(event: any) {
    console.log('loaded:', event);
  }

  uploading(event: any) {
    console.log('loading:', event);
  }
}