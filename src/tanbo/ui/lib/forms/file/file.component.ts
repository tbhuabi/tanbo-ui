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
  @Input() ext: string | RegExp | Array<string | RegExp> = '';
  @Input() name: string;
  @Input() forId: string;
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

    const validators: RegExp[] = [];
    if (this.ext) {
      let ext: Array<RegExp | string>;
      if (!Array.isArray(this.ext)) {
        ext = [this.ext];
      }
      ext.forEach(item => {
        if (typeof item === 'string') {
          validators.push(new RegExp(`(${item})$`, 'i'));
        } else if (item instanceof RegExp) {
          validators.push(item);
        }
      });
    }

    for (const file of files) {
      const ext = (file.name.match(/\.\w+$/) || ['.'])[0].substring(1);
      if (this.validate(ext, validators)) {
        data.append(this.name, file);
      } else {
        this.uiUploadError.emit(new Error(`不支持 "${file.name}" 上传`));
        return;
      }
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

  private validate(ext: string, validators: RegExp[]) {
    for (const item of validators) {
      if (!item.test(ext)) {
        return false;
      }
    }
    return true;
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