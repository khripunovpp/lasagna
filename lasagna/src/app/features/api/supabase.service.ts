import {inject, Injectable} from '@angular/core';
import {ApiInterface} from './api.interface';
import {RestService} from './rest.service';
import {FeatureFlagsService} from '../../shared/service/services/feature-flags.service';
import {API_BASE_URL} from './api-base-url.token';

export interface SupabaseResponse<T = any> {
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

export interface SupabaseBatchResponse {
  added: {
    [key: string]: {
      id: string
      updated_at: string
    }
  }
  errors: { [key: string]: string }
  hasErrors: boolean
}

@Injectable({
  providedIn: 'root'
})
export class SupabaseService implements ApiInterface {
  readonly endpoint = inject(API_BASE_URL);
  private readonly _restService = inject(RestService);
  private readonly _featureFlagsService = inject(FeatureFlagsService);

  get isConfigured(): boolean {
    return !!this.endpoint;
  }

  get<T = any>(url: string, params?: Record<string, any>) {
    return this._restService.get<T>(this.endpoint + url, params);
  }

  post<T>(url: string, data?: Record<string, any>) {
    return this._restService.post<Record<string, any>, T>(this.endpoint + url, data);
  }

  put<T>(url: string, data?: Record<string, any>) {
    return this._restService.put<T>(this.endpoint + url, data);
  }

  delete<T = void>(url: string) {
    return this._restService.delete<T>(this.endpoint + url);
  }

  patch<T>(url: string, data?: Record<string, any>) {
    return this._restService.patch<T>(this.endpoint + url, data);
  }
}
