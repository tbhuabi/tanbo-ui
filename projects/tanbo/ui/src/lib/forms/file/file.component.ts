import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { HttpEvent, HttpRequest, HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { GourdBoolean } from '../../utils';

@Component({
  selector: 'ui-input[type=file]',
  templateUrl: './file.component.html'
})
export class FileComponent {
  @Output() uiChange = new EventEmitter<any>();
  @Output() uiUploadStart = new EventEmitter<void>();
  @Output() uiUploading = new EventEmitter<number>();
  @Output() uiUploaded = new EventEmitter<any>();
  @Output() uiUploadError = new EventEmitter<Error>();
  @Input() placeholder = '上传文件';
  @Input() name: string;
  @Input() forId: string;
  @Input() accept: string;
  @Input() uploader: (data: FormData) => (HttpRequest<any> | Observable<HttpEvent<any>>);

  @HostBinding('class.ui-focus') @GourdBoolean() focus = false;

  @Input() @GourdBoolean() disabled = false;
  @Input() @GourdBoolean() readonly = false;
  @Input() @GourdBoolean() multiple = false;

  isShowLoading = false;
  progress = 0;
  refreshState = true;

  constructor(private http: HttpClient) {
  }

  selectedFiles(event: any) {
    this.progress = 0;
    this.uiChange.emit(event);
    const data = new FormData();
    const files = event.target.files as FileList;
    if (!files.length) {
      return;
    }

    for (const file of Array.from(files)) {
      data.append(this.name, file);
    }
    if (typeof this.uploader === 'function') {
      const request = this.uploader(data);
      if (request instanceof HttpRequest) {
        this.upload(this.http.request(request));
      } else if (request instanceof Observable) {
        this.upload(request);
      }
    }
    this.refresh();
  }

  private upload(obs: Observable<HttpEvent<any>>) {
    this.isShowLoading = true;
    obs.pipe(filter((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          this.uiUploadStart.emit();
          return false;
        case HttpEventType.UploadProgress:
          const percentDone = Math.floor(100 * event.loaded / event.total);
          this.progress = percentDone;
          this.uiUploading.emit(percentDone);
          return false;
        case HttpEventType.Response:
          return true;
        default:
          return false;
      }
    })).pipe(map(response => {
      if (response instanceof HttpResponse) {
        return response.body;
      }
      return response;
    })).subscribe(response => {
      this.progress = 100;
      this.isShowLoading = false;
      // this.refresh();
      this.uiUploaded.emit(response);
    }, error => {
      this.progress = 0;
      this.isShowLoading = false;
      // this.refresh();
      this.uiUploadError.emit(error);
    });
  }

  private refresh() {
    this.refreshState = false;
    setTimeout(() => {
      this.refreshState = true;
    });
  }
}
