import { Component, OnInit } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  imageUploader: any = null;

  constructor() {
    setTimeout(() => {
      this.imageUploader = function() {
        return Promise.resolve().then(() => 'src');
      };
    });
  }

}
