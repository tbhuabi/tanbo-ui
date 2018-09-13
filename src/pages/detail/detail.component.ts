import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { PickerDataProvider, PickerCell } from '../../tanbo/ui/public_api';
import { DetailService } from './detail.service';

@Component({
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  providers: [
    DetailService
  ]
})
export class DetailComponent implements OnInit, PickerDataProvider {
  list: any[] = [];

  get pickerDataProvider() {
    return this;
  }

  constructor(private detailService: DetailService) {
  }

  ngOnInit() {
    this.detailService.getAddressList('0').subscribe((response: any) => {
      if (response.code === 10000) {
        this.list = response.data.map((item: any) => {
          return {
            text: item.regionName,
            value: item.regionId
          };
        });
      }
    });
  }

  getChildren(item: PickerCell) {
    return this.detailService.getAddressList(String(item.value)).pipe(map((response: any) => {
      if (response.code === 10000) {
        return response.data.map((item: any) => {
          return {
            text: item.regionName,
            value: item.regionId
          };
        })
      }
    })).toPromise();
  }
}