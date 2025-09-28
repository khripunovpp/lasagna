import {inject, Injectable} from "@angular/core";
import {ApiAgentInterface} from "../../../api/api-agent.interface";
import {Recipe} from "../models/Recipe";
import {StrapiBatchResponse, StrapiResponse, StrapiService} from '../../../api/strapi.service';
import {RecipeCloudDTO} from '../schemes/Recipe.scheme';
import qs from "qs";

@Injectable({
  providedIn: 'root'
})
export class RecipesApiService
  implements ApiAgentInterface<Recipe> {
  strapiService = inject(StrapiService);

  get(id: string) {
    return this.strapiService.get<StrapiResponse<unknown>>(`/recipes/${id}`)
      .then((response) => {
        return Recipe.fromCloud(response.data);
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

    return this.strapiService.get<StrapiResponse<RecipeCloudDTO[]>>(`/recipes?${query}`)
      .then((response) => {
        return response.data?.length > 0
          ? response.data.map(item => Recipe.fromCloud(item))
          : null;
      });
  }

  post(data?: Record<string, any>) {
    return this.strapiService.post<StrapiResponse<unknown>>('/recipes', data)
      .then((response) => {
        return Recipe.fromCloud(response);
      });
  }

  postMany(data: RecipeCloudDTO[]) {
    return this.strapiService.post<StrapiBatchResponse>('/recipes/batch', data);
  }

  put(id: string, data?: Record<string, any>) {
    return this.strapiService.put<StrapiResponse<unknown>>(`/recipes/${id}`, data)
      .then((response) => {
        return Recipe.fromCloud(response);
      });
  }

  putMany(data: Array<{ id: string, data: Record<string, any> }>) {
    return this.strapiService.put<StrapiBatchResponse>('/recipes/batch', data);
  }

  delete(id: string) {
    return this.strapiService.delete(`/recipes/${id}`);
  }
}
