import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Directive({
  selector: '[uiDownload]'
})
export class DownloadDirective {
  @Input()
  downloader: Observable<HttpEvent<Blob>>;
  @Input()
  filename: string;
  @Input()
  ext: string;
  @Input()
  mime = '';
  @Input()
  endings: EndingType = 'transparent';

  @Output()
  uiLoadStartBefore = new EventEmitter<void>();

  @Output()
  uiLoadingStart = new EventEmitter<void>();

  @Output()
  uiLoading = new EventEmitter<number>();

  @Output()
  uiLoaded = new EventEmitter<void>();

  @Output()
  uiLoadError = new EventEmitter<Error>();

  @HostListener('click')
  download() {
    this.uiLoadStartBefore.emit();
    setTimeout(() => {
      if (!(this.downloader instanceof Observable)) {
        return;
      }
      this.downloader.pipe(filter((event: HttpEvent<Blob>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            this.uiLoadingStart.emit();
            return false;
          case HttpEventType.UploadProgress:
            const percentDone = Math.floor(100 * event.loaded / event.total);
            this.uiLoading.emit(percentDone);
            return false;
          case HttpEventType.Response:
            return true;
          default:
            return false;
        }
      })).subscribe(res => {
        this.uiLoaded.emit();
        const file = new Blob([(res as HttpResponse<Blob>).body], {
          type: this.mime,
          endings: this.endings
        });
        const url = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.target = '_blank';
        if (this.filename) {
          a.download = this.ext ? `${this.filename}.${this.ext}` : this.filename;
        }
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, error => {
        this.uiLoadError.emit(error);
      });
    })
  }
}
