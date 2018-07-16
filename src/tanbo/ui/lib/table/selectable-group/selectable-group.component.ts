import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { SelectableItemComponent } from '../selectable-item/selectable-item.component';
import { TableService } from '../table.service';

@Component({
  /*tslint:disable*/
  selector: 'tr[ui-table-selector]',
  /*tslint:enable*/
  templateUrl: './selectable-group.component.html'
})
export class SelectableGroupComponent implements OnDestroy, OnInit {
  isChecked = false;
  private subs: Subscription[] = [];
  private items: SelectableItemComponent[] = [];
  private events: Array<{ token: SelectableItemComponent, unsub: Subscription }> = [];
  private selectedValues: any[] = [];

  constructor(private tableService: TableService) {
  }

  ngOnInit() {
    this.subs.push(this.tableService.onPush.subscribe((item: SelectableItemComponent) => {
      this.items.push(item);
      this.isChecked = false;
      this.events.push({
        token: item,
        unsub: item.uiCheckStateChange.subscribe(() => {
          this.updateStateAndCheckedItem();
        })
      });
    }));
    this.subs.push(this.tableService.onDelete.subscribe((item: SelectableItemComponent) => {
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

      this.updateStateAndCheckedItem();
    }));
  }

  ngOnDestroy() {
    this.subs.forEach(item => item.unsubscribe());
  }

  change(b: boolean) {
    this.isChecked = b;
    this.selectedValues = [];
    this.items.forEach(item => {
      item.checked = b;
      if (b) {
        this.selectedValues.push(item.data);
      }
    });
    this.tableService.checked(this.selectedValues);
  }

  updateStateAndCheckedItem() {
    this.selectedValues = [];
    let isSelectedAll = true;
    for (const item of this.items) {
      if (!item.checked) {
        isSelectedAll = false;
      } else {
        this.selectedValues.push(item.data);
      }
    }
    this.isChecked = isSelectedAll;
    this.tableService.checked(this.selectedValues);
  }
}