import { Directive, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { TableService } from './table.service';

@Directive({
  selector: '[uiTable]',
  providers: [
    TableService
  ]
})
export class TableDirective implements OnDestroy, OnInit {
  @Output() uiSelectedItemsChange = new EventEmitter<any[]>();
  private sub: Subscription;

  constructor(private tableService: TableService) {
  }

  ngOnInit() {
    this.sub = this.tableService.onChecked.subscribe(result => {
      this.uiSelectedItemsChange.emit(result);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
