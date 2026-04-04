import {inject, Injectable} from "@angular/core";
import {ApiAgentInterface} from "../../../api/api-agent.interface";
import {Recipe} from "../models/Recipe";
import {SupabaseBatchResponse, SupabaseResponse, SupabaseService} from '../../../api/supabase.service';
import {RecipeCloudDTO} from '../schemes/Recipe.scheme';
import qs from "qs";

@Injectable({
  providedIn: 'root'
})
export class RecipesApiService
  implements ApiAgentInterface<Recipe> {
  supabaseService = inject(SupabaseService);

  get(id: string) {
    return this.supabaseService.get<SupabaseResponse<unknown>>(`/recipes/${id}`)
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

    return this.supabaseService.get<SupabaseResponse<RecipeCloudDTO[]>>(`/recipes?${query}`)
      .then((response) => {
        return response.data?.length > 0
          ? response.data.map(item => Recipe.fromCloud(item))
          : null;
      });
  }

  post(data?: Record<string, any>) {
    return this.supabaseService.post<SupabaseResponse<unknown>>('/recipes', data)
      .then((response) => {
        return Recipe.fromCloud(response.data);
      });
  }

  postMany(data: RecipeCloudDTO[]) {
    return this.supabaseService.post<SupabaseBatchResponse>('/recipes/batch', data);
  }

  put(id: string, data?: Record<string, any>) {
    return this.supabaseService.put<SupabaseResponse<unknown>>(`/recipes/${id}`, data)
      .then((response) => {
        return Recipe.fromCloud(response);
      });
  }

  putMany(data: Array<{ id: string, data: Record<string, any> }>) {
    return this.supabaseService.put<SupabaseBatchResponse>('/recipes/batch', data);
  }

  delete(id: string) {
    return this.supabaseService.delete(`/recipes/${id}`);
  }
}
