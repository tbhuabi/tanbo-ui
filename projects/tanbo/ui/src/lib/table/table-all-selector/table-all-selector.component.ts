import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { TableSelectableItemComponent } from '../table-selectable-item/table-selectable-item.component';
import { TableService } from '../table.service';

@Component({
  /*tslint:disable*/
  selector: 'tr[uiTableAllSelector]',
  /*tslint:enable*/
  templateUrl: './table-all-selector.component.html'
})
export class TableAllSelectorComponent implements OnDestroy, OnInit {
  isChecked = false;
  private subs: Subscription[] = [];
  private items: TableSelectableItemComponent[] = [];
  private events: Array<{ token: TableSelectableItemComponent, unsub: Subscription }> = [];
  private selectedValues: any[] = [];
  private eventFromSelf = false;

  constructor(private tableService: TableService) {
  }

  ngOnInit() {
    this.subs.push(this.tableService.onPush.subscribe((item: TableSelectableItemComponent) => {
      this.items.push(item);
      this.updateStateAndSelectedValues();
      this.events.push({
        token: item,
        unsub: item.uiCheckStateChange.pipe(filter(() => !this.eventFromSelf)).subscribe(() => {
          this.updateStateAndSelectedValues();
          this.tableService.checked(this.selectedValues);
        })
      });
    }));
    this.subs.push(this.tableService.onDelete.subscribe((item: TableSelectableItemComponent) => {
      const index = this.items.indexOf(item);
      if (index > -1) {
        this.items.splice(index, 1);
      }
      this.events = this.events.filter(config => {
        if (config.token === item) {
          config.unsub.unsubscribe();
          return false;
        }
        return true;
      });
    }));
  }

  ngOnDestroy() {
    this.subs.forEach(item => item.unsubscribe());
  }

  change(b: boolean) {
    this.eventFromSelf = true;
    this.isChecked = b;
    this.selectedValues = [];
    this.items.forEach(item => {
      if (item.checked !== b) {
        item.change(b);
      }
      if (b) {
        this.selectedValues.push(item.uiTableSelectableItem);
      }
    });
    this.tableService.checked(this.selectedValues);
    this.eventFromSelf = false;
  }

  updateStateAndSelectedValues() {
    this.selectedValues = [];
    let isSelectedAll = true;
    for (const item of this.items) {
      if (!item.checked) {
        isSelectedAll = false;
      } else {
        this.selectedValues.push(item.uiTableSelectableItem);
      }
    }
    this.isChecked = isSelectedAll;
  }
}
