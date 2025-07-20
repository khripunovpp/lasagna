import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  httpClient = inject(HttpClient);

  get<T>(url: string, params?: Record<string, any>) {
    return firstValueFrom(this.httpClient.get<T>(url, {params}))
  }

  post<T>(url: string, data?: Record<string, any>) {
    return firstValueFrom(this.httpClient.post<T>(url, data))
  }

  put<T>(url: string, data?: Record<string, any>) {
    return firstValueFrom(this.httpClient.put<T>(url, data))
  }

  delete<T>(url: string) {
    return firstValueFrom(this.httpClient.delete<T>(url))
  }

  patch<T>(url: string, data?: Record<string, any>) {
    return firstValueFrom(this.httpClient.patch<T>(url, data))
  }
}
