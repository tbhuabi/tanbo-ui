import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DetailService {
  constructor(private http: HttpClient) {
  }

  getAddressList(parentId: string) {
    return this.http.get('/api/consumer/region', {
      params: {
        parentId
      }
    });
  }
}