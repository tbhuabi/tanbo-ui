import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpEvent, HttpRequest, HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { attrToBoolean } from '../../utils';

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
  @Input() ext = '';
  @Input() name = '';
  @Input() forId = '';
  @Input() uploader: (data: FormData) => HttpRequest<any> | Observable<HttpEvent<any>>;

  @Input()
  set multiple(v: any) {
    this._multiple = attrToBoolean(v);
  }

  get multiple() {
    return this._multiple;
  }

  @Input()
  set disabled(v: any) {
    this._disabled = attrToBoolean(v);
  }

  get disabled() {
    return this._disabled;
  }

  @Input()
  set readonly(v: any) {
    this._readonly = attrToBoolean(v);
  }

  get readonly() {
    return this._readonly;
  }

  isShowLoading = false;
  progress = 0;

  private _disabled = false;
  private _readonly = false;
  private _multiple = false;

  constructor(private http: HttpClient) {
  }

  selectedFiles(event: any) {
    this.progress = 0;
    this.uiChange.emit(event);
    const data = new FormData();
    const files = event.target.files;
    if (!files.length) {
      return;
    }
    for (let i = 0; i < files.length; i++) {
      data.append(this.name, files[i]);
    }
    if (typeof this.uploader === 'function') {
      const request = this.uploader(data);
      if (request instanceof HttpRequest) {
        this.upload(this.http.request(request));
      } else if (request instanceof Observable) {
        this.upload(request);
      }
    }
  }

  private upload(obs: Observable<HttpEvent<any>>) {
    this.isShowLoading = true;
    obs.pipe(tap((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          this.uiUploadStart.emit();
          break;
        case HttpEventType.UploadProgress:
          const percentDone = Math.floor(100 * event.loaded / event.total);
          this.progress = percentDone;
          this.uiUploading.emit(percentDone);
          break;
      }
    })).pipe(map(response => {
      if (response instanceof HttpResponse) {
        return response.body;
      }
      return response;
    })).subscribe(response => {
      this.progress = 100;
      this.isShowLoading = false;
      this.uiUploaded.emit(response);
    }, error => {
      this.progress = 0;
      this.isShowLoading = false;
      this.uiUploadError.emit(error);
    });
  }
}