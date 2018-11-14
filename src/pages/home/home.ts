import {
  Component,
  OnInit,
  Compiler,
  Injector,
  ViewChild,
  ViewContainerRef,
  NgModuleRef, Input
} from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Component({
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit {
  @Input() value: any = '<p>6</p>';
  //tslint:disable
  imgUrl: string = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542172864712&di=1202c0666232da5cbd4e632a0593d05b&imgtype=0&src=http%3A%2F%2Ffmn.rrimg.com%2Ffmn060%2Fxiaozhan%2F20121107%2F2330%2Fxlarge_qdn2_42ae000018f0125b.jpg';
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

  change(obj: object) {
    console.log(obj);
  }

  uploading(event: any) {
    console.log('loading:', event);
  }
}