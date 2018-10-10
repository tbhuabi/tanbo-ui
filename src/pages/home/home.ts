import {
  Component,
  OnInit,
  Compiler,
  NgModule,
  Injector,
  ViewChild,
  ViewContainerRef,
  NgModuleRef
} from '@angular/core';
import { UIModule } from '../../tanbo/ui/public_api';

@Component({
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('vc', {read: ViewContainerRef}) vc: ViewContainerRef;
  isShow = false;

  constructor(private compiler: Compiler,
              private moduleRef: NgModuleRef<any>,
              private injector: Injector) {
  }


  ngOnInit() {
    setTimeout(() => {
      this.isShow = true;

    }, 1000);
  }

  show(v: any) {
    console.log(v);
  }
}