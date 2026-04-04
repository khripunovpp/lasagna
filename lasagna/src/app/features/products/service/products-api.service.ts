import {inject, Injectable} from '@angular/core';
import {ApiAgentInterface} from '../../api/api-agent.interface';
import {Product} from './Product';
import {SupabaseBatchResponse, SupabaseResponse, SupabaseService} from '../../api/supabase.service';
import {ProductCloudDTO} from './Product.scheme';
import qs from 'qs';

@Injectable({
  providedIn: 'root'
})
export class ProductsApiService
  implements ApiAgentInterface<Product> {
  supabaseService = inject(SupabaseService);

  get(id: string) {
    return this.supabaseService.get<SupabaseResponse<unknown>>(`/products/${id}`)
      .then((response) => {
        return Product.fromCloud(response.data);
      });
  }

  getByField(field: string, value: any) {
    const query = qs.stringify({
      filters: {
        [field]: {
          $eq: value,
        },
      },
    }, {
      encodeValuesOnly: true,
    });

    return this.supabaseService.get<SupabaseResponse<ProductCloudDTO[]>>(`/products?${query}`)
      .then((response) => {
        return response.data?.length > 0
          ? response.data.map(item => Product.fromCloud(item))
          : null;
      });
  }

  post(data?: Record<string, any>) {
    return this.supabaseService.post<SupabaseResponse<unknown>>('/products', data)
      .then((response) => {
        return Product.fromCloud(response.data);
      });
  }

  postMany(data: ProductCloudDTO[]) {
    return this.supabaseService.post<SupabaseBatchResponse>('/products/batch', data);
  }

  put(id: string, data?: Record<string, any>) {
    return this.supabaseService.put<SupabaseResponse<unknown>>(`/products/${id}`, data)
      .then((response) => {
        return Product.fromCloud(response);
      });
  }

  putMany(data: Array<{ id: string, data: Record<string, any> }>) {
    return this.supabaseService.put<SupabaseBatchResponse>('/products/batch', data);
  }

  delete(id: string) {
    return this.supabaseService.delete(`/products/${id}`);
  }
}
