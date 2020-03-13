import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DrawerController } from '@tanbo/ui/src/lib/app/drawer-controller';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('drawerTemplate') drawerTemplate: TemplateRef<any>;
  data: Array<{ label: string, value: string }> = [];

  constructor(private drawerController: DrawerController) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.data = [{
        label: 'a',
        value: 'a'
      }, {
        label: 'b',
        value: 'b'
      }];
    });
  }

  drawer() {
    this.drawerController.show({
      direction: 'right',
      content: this.drawerTemplate
    }).then(() => {
      console.log(333)
    })
  }

  hideDrawer() {
    console.log(111)
    this.drawerController.hide();
  }
}
