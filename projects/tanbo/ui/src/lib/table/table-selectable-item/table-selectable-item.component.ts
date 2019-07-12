import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';

import { TableService } from '../table.service';
import { AttrBoolean } from '../../../lib/utils';

@Component({
  /*tslint:disable*/
  selector: 'tr[uiTableSelectableItem]',
  /*tslint:enable*/
  templateUrl: './table-selectable-item.component.html'
})
export class TableSelectableItemComponent implements OnDestroy, OnInit {
  @Output() uiCheckStateChange = new EventEmitter<boolean>();
  @Input() uiTableSelectableItem: any;
  @Input() @AttrBoolean() checked = false;

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
