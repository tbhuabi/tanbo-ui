import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Directive({
  selector: '[uiDownload]'
})
export class DownloadDirective {
  @Input()
  api: string;
  @Input()
  filename: string;
  @Input()
  ext: string;
  @Input()
  params: { [key: string]: string | string[] };

  @Output()
  loadingStart = new EventEmitter<void>();

  @Output()
  loaded = new EventEmitter<void>();

  constructor(private http: HttpClient) {
  }
  @HostListener('click')
  download() {
    this.loadingStart.emit();
    this.http.get(this.api, {
      params: this.params,
      responseType: 'blob'
    }).subscribe(res => {
      this.loaded.emit();
      const file = new Blob([res]);
      const url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.download = this.ext ? `${this.filename}.${this.ext}` : this.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }
}
