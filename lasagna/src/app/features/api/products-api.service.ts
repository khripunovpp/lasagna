import {inject, Injectable} from '@angular/core';
import {ApiAgentInterface} from './api-agent.interface';
import {Product} from '../products/service/Product';
import {StrapiService} from './strapi.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsApiService implements ApiAgentInterface<Product> {
  strapiService = inject(StrapiService);

  get(id: string) {
    return this.strapiService.get(`/products/${id}`).then((response) => {
      return Product.fromCloud(response.data);
    });
  }

  post(data?: Record<string, any>) {
    return this.strapiService.post('/products', data).then((response) => {
      return Product.fromCloud(response);
    });
  }

  put(id: string, data?: Record<string, any>) {
    return this.strapiService.put(`/products/${id}`, data).then((response) => {
      return Product.fromCloud(response);
    });
  }

  delete(id: string) {
    return this.strapiService.delete(`/products/${id}`);
  }
}
