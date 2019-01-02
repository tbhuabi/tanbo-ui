import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';

import { TableService } from '../table.service';

@Component({
  /*tslint:disable*/
  selector: 'tr[uiSelectable]',
  /*tslint:enable*/
  templateUrl: './selectable-item.component.html'
})
export class SelectableItemComponent implements OnDestroy, OnInit {
  @Input() uiSelectable: any;
  @Input() checked = false;
  @Output() uiCheckStateChange = new EventEmitter<boolean>();

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