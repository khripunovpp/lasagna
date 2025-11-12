import {inject, Injectable} from '@angular/core';
import {ApiAgentInterface} from '../../api/api-agent.interface';
import {Product} from './Product';
import {StrapiBatchResponse, StrapiResponse, StrapiService} from '../../api/strapi.service';
import {ProductCloudDTO} from './Product.scheme';
import qs from 'qs';

@Injectable({
  providedIn: 'root'
})
export class ProductsApiService
  implements ApiAgentInterface<Product> {
  strapiService = inject(StrapiService);

  get(id: string) {
    return this.strapiService.get<StrapiResponse<unknown>>(`/products/${id}`)
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

    return this.strapiService.get<StrapiResponse<ProductCloudDTO[]>>(`/products?${query}`)
      .then((response) => {
        return response.data?.length > 0
          ? response.data.map(item => Product.fromCloud(item))
          : null;
      });
  }

  post(data?: Record<string, any>) {
    return this.strapiService.post<StrapiResponse<unknown>>('/products', data)
      .then((response) => {
        return Product.fromCloud(response);
      });
  }

  postMany(data: ProductCloudDTO[]) {
    return this.strapiService.post<StrapiBatchResponse>('/products/batch', data);
  }

  put(id: string, data?: Record<string, any>) {
    return this.strapiService.put<StrapiResponse<unknown>>(`/products/${id}`, data)
      .then((response) => {
        return Product.fromCloud(response);
      });
  }

  putMany(data: Array<{ id: string, data: Record<string, any> }>) {
    return this.strapiService.put<StrapiBatchResponse>('/products/batch', data);
  }

  delete(id: string) {
    return this.strapiService.delete(`/products/${id}`);
  }
}
