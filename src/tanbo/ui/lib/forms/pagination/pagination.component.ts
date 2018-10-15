import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface PaginationItem {
  pageIndex: number | string;
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
export class PaginationComponent {
  @Input() size: string = '';
  @Input() btnCount: number = 8;

  @Input()
  set pages(pages: number) {
    if (!pages || pages < 1) {
      pages = 1;
    }
    this._pages = pages;
    this.setPaginationItems();
  }

  get pages() {
    return this._pages;
  }

  @Input()
  set currentPage(currentPage: number) {
    if (!currentPage || currentPage < 1) {
      currentPage = 1;
    }
    this._currentPage = currentPage;
    this.setPaginationItems();
  }

  @Output() uiChange = new EventEmitter<number>();

  get currentPage() {
    return this._currentPage;
  }

  pageList: Array<PaginationItem> = [];
  private _currentPage: number = 1;
  private _pages: number = 1;

  private get _btnLength() {
    return Math.floor(this.btnCount / 2);
  }

  onChange(currentPage: number) {
    if (typeof currentPage === 'number' && currentPage !== this.currentPage) {
      this.uiChange.emit(currentPage);
      this.currentPage = currentPage;
    }
  }

  private setPaginationItems() {
    this.pageList = [];
    if (this._currentPage > this._pages) {
      this._pages = this._currentPage;
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