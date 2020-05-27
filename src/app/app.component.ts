import { Component, OnInit } from '@angular/core';
import { DialogController, NotifyController, NotifyType } from '@tanbo/ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private notifyController: NotifyController,
              private dialogController: DialogController) {
  }

  ngOnInit() {

  }

  show() {
    this.notifyController.push({
      content: 'test',
      type: NotifyType.Danger
    })
  }
}
