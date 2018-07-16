import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';

import { TableService } from '../table.service';

@Component({
  /*tslint:disable*/
  selector: 'tr[ui-selectable]',
  /*tslint:enable*/
  templateUrl: './selectable-item.component.html'
})
export class SelectableItemComponent implements OnDestroy, OnInit {
  @Input('ui-selectable')
  data: any;
  @Output()
  uiCheckStateChange = new EventEmitter<boolean>();

  checked = false;

  constructor(private tableService: TableService) {
  }

  ngOnInit() {
    this.tableService.push(this);
  }

  ngOnDestroy() {
    this.tableService.delete(this);
  }

  change(state: boolean) {
    this.checked = state;
    this.uiCheckStateChange.emit(state);
  }
}