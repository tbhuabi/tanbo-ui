import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Headers, Response, RequestOptionsArgs, ResponseContentType } from '@angular/http';

export interface UiRequestOptions {
    params?: {
        [key: string]: any | any[];
    };
    headers?: Headers;
    body?: any;
    withCredentials?: boolean;
    responseType?: ResponseContentType;
}

export interface UiHttpConfig {
    apiPrefix?: string;
    headers?: Headers;
    withCredentials?: boolean;
    responseType?: ResponseContentType;
    openTimeStamp?: boolean;
    responseHandle?(response: Observable<Response>): Promise<any>;
}

@Injectable()
export class UiHttp {
    private static apiPrefix: string = '';
    private static headers: Headers = new Headers({
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest'
    });
    private static withCredentials: boolean = true;
    private static responseType: ResponseContentType = ResponseContentType.Json;
    private static openTimeStamp: boolean = true;

    static config(config: UiHttpConfig) {
        UiHttp.apiPrefix = config.apiPrefix || UiHttp.apiPrefix;
        UiHttp.headers = config.headers || UiHttp.headers;
        UiHttp.withCredentials = config.withCredentials === true || config.withCredentials === undefined;
        UiHttp.responseType = config.responseType || UiHttp.responseType;
        UiHttp.openTimeStamp = config.openTimeStamp !== undefined ? config.openTimeStamp : true;
        UiHttp.responseHandle = config.responseHandle || UiHttp.responseHandle;
        return UiHttp;
    }

    static responseHandle(response: Observable<Response>): Promise<any> {
        return new Promise((resolve, reject) => {
            response.toPromise().then(response => {
                if (response.status === 200) {
                    try {
                        let result = response.json();
                        resolve(result);
                    } catch (e) {
                        reject(e);
                    }

                } else {
                    reject(response.text());
                }
            }, error => {
                reject(error);
            });
        });
    }

    private static requestHandle(options: UiRequestOptions): RequestOptionsArgs {
        if (UiHttp.openTimeStamp) {
            if (options.params) {
                options.params.t = Date.now();
            } else {
                options.params = {
                    t: Date.now()
                };
            }
        }

        return {
            params: options.params,
            headers: options.headers || UiHttp.headers,
            body: options.body,
            withCredentials: options.withCredentials || UiHttp.withCredentials,
            responseType: options.responseType || UiHttp.responseType
        };
    }

    constructor(private http: Http) {
    }

    get(url: string, options: UiRequestOptions = {}): Promise<any> {
        const result: Observable<Response> = this.http.get(UiHttp.apiPrefix + url, UiHttp.requestHandle(options));
        return UiHttp.responseHandle(result);
    }

    post(url: string, options: UiRequestOptions = {}): Promise<any> {
        const result: Observable<Response> = this.http.post(UiHttp.apiPrefix + url,
            options.body,
            UiHttp.requestHandle(options));
        return UiHttp.responseHandle(result);
    }

    put(url: string, options: UiRequestOptions = {}): Promise<any> {
        const result: Observable<Response> = this.http.put(UiHttp.apiPrefix + url,
            options.body,
            UiHttp.requestHandle(options));
        return UiHttp.responseHandle(result);
    }

    delete(url: string, options: UiRequestOptions = {}): Promise<any> {
        const result: Observable<Response> = this.http.delete(UiHttp.apiPrefix + url, UiHttp.requestHandle(options));
        return UiHttp.responseHandle(result);
    }

    upload(url: string, options: UiRequestOptions = {}): Promise<any> {
        const result: Observable<Response> = this.http.post(UiHttp.apiPrefix + url,
            options.body,
            UiHttp.requestHandle(options));
        return UiHttp.responseHandle(result);
    }
}