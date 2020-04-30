import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  @Input()
  mime = '';
  @Input()
  endings: EndingType = 'transparent';
  @Input()
  headers: { [key: string]: string | string[] } | HttpHeaders;

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
      headers: this.headers,
      params: this.params,
      responseType: 'blob'
    }).subscribe(res => {
      this.loaded.emit();
      const file = new Blob([res], {
        type: this.mime,
        endings: this.endings
      });
      const url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.download = this.ext ? `${this.filename}.${this.ext}` : this.filename;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
  }
}
