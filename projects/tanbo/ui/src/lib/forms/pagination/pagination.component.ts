import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

export interface PaginationItem {
  pageIndex: number;
  label: number | string;
}

@Component({
  selector: 'ui-pagination',
  templateUrl: './pagination.component.html',
  host: {
    '[class.ui-pagination-sm]': 'size === "sm"',
    '[class.ui-pagination-lg]': 'size === "lg"'
  }
})
export class PaginationComponent implements OnChanges {
  @Input() size = '';
  @Input() btnCount = 8;
  @Input() rows = 1;
  @Input() pageSize = 10;
  @Input() pages = 1;
  @Input() currentPage = 1;

  @Output() uiChange = new EventEmitter<number>();

  pageList: Array<PaginationItem> = [];

  private get _btnLength() {
    return Math.floor(this.btnCount / 2);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let name in changes) {
      if (/pageSize|rows/.test(name)) {
        this.pages = Math.ceil(this.rows / this.pageSize);
        break;
      }
    }
    this.setPaginationItems();
  }

  onChange(currentPage: number) {
    if (currentPage !== this.currentPage) {
      this.uiChange.emit(currentPage);
      this.currentPage = currentPage;
      this.setPaginationItems();
    }
  }

  private setPaginationItems() {
    this.pageList = [];
    if (this.currentPage > this.pages) {
      this.currentPage = this.pages || 1;
    }
    if (this.pages <= 1) {
      return;
    }
    if (this.currentPage !== 1) {
      this.pageList.push({
        pageIndex: 1,
        label: '&laquo;'
      });
      this.pageList.push({
        pageIndex: this.currentPage - 1,
        label: '&lsaquo;'
      });
    }

    let smallIndex = this.currentPage - this._btnLength;
    let maxIndex = this.currentPage + this._btnLength;
    if (this.currentPage < this._btnLength + 1) {
      maxIndex = maxIndex - this.currentPage + this._btnLength;
    }

    if (this.pages - this._btnLength < this.currentPage) {
      smallIndex = this.pages - this._btnLength * 2;
    }
    smallIndex = smallIndex < 1 ? 1 : smallIndex;
    maxIndex = maxIndex > this.pages ? this.pages : maxIndex;
    for (let i = smallIndex; i <= maxIndex; i++) {
      this.pageList.push({
        pageIndex: i,
        label: i
      });
    }

    if (this.currentPage !== this.pages) {
      this.pageList.push({
        pageIndex: this.currentPage + 1,
        label: '&rsaquo;'
      });
      this.pageList.push({
        pageIndex: this.pages,
        label: '&raquo;'
      });
    }
  }
}