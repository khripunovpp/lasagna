import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {TokenService} from '../../shared/service/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  httpClient = inject(HttpClient);
  tokenService = inject(TokenService);

  private withAuthHeaders(headers?: HttpHeaders): HttpHeaders {
    const token = this.tokenService.getToken();
    let result = headers || new HttpHeaders();
    if (token) {
      result = result.set('Authorization', `Bearer ${token}`);
    }
    return result;
  }

  get<T>(url: string, params?: Record<string, any>, headers?: HttpHeaders) {
    return firstValueFrom(this.httpClient.get<T>(url, {
      params,
      headers: this.withAuthHeaders(headers)
    }))
  }

  post<T>(url: string, data?: Record<string, any>, headers?: HttpHeaders) {
    return firstValueFrom(this.httpClient.post<T>(url, data, {
      headers: this.withAuthHeaders(headers)
    }))
  }

  put<T>(url: string, data?: Record<string, any>, headers?: HttpHeaders) {
    return firstValueFrom(this.httpClient.put<T>(url, data, {
      headers: this.withAuthHeaders(headers)
    }))
  }

  delete<T>(url: string, headers?: HttpHeaders) {
    return firstValueFrom(this.httpClient.delete<T>(url, {
      headers: this.withAuthHeaders(headers)
    }))
  }

  patch<T>(url: string, data?: Record<string, any>, headers?: HttpHeaders) {
    return firstValueFrom(this.httpClient.patch<T>(url, data, {
      headers: this.withAuthHeaders(headers)
    }))
  }
}
