import {inject, Injectable} from '@angular/core';
import {ApiInterface} from './api.interface';
import {RestService} from './rest.service';

export interface StrapiResponse<T extends any = any> {
  data: T;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class StrapiService
  implements ApiInterface {
  restService = inject(RestService);
  endpoint = 'http://localhost:1337/api'

  get<T = any | any[]>(url: string, params?: Record<string, any>) {
    return this.restService.get<T>(this.endpoint + url, params);
  }

  post<T>(url: string, data?: Record<string, any>) {
    return this.restService.post<T>(this.endpoint + url, {data});
  }

  put<T>(url: string, data?: Record<string, any>) {
    return this.restService.put<T>(this.endpoint + url, {data});
  }

  delete<T = void>(url: string) {
    return this.restService.delete<T>(this.endpoint + url);
  }

  patch<T>(url: string, data?: Record<string, any>) {
    return this.restService.patch<T>(this.endpoint + url, data);
  }
}
