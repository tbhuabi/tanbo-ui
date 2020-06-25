import { AfterViewInit, Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { ModalController } from '@tanbo/ui/src/lib/modal/help';
import { createEditor } from '@tanbo/tbus';
import { Subject } from 'rxjs';

class EventEmitter extends Subject<any> {
  private v: any;
  emit(v: any) {
    this.v = v;
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('divElement')
  divElement: ElementRef;
  @ViewChild('modal')
  modal: TemplateRef<any>;
  data = {
    date: ''
  };
  test = '';

  onShow = new EventEmitter();

  constructor(private modalController: ModalController) {
  }

  ngAfterViewInit() {
    // createEditor(this.divElement.nativeElement);
  }

  show() {
    console.log(this.data);
  }
}
