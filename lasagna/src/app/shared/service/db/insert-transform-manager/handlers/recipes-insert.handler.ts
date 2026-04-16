import {Stores} from '../../const/stores';
import {ProductDTO} from '../../../../../features/products/service/Product.scheme';
import {InsertDataHandler} from '../insert-handlers.types';
import {Product} from '../../../../../features/products/service/Product';
import {RecipeDTO} from '../../../../../features/recipes/service/schemes/Recipe.scheme';
import {Recipe} from '../../../../../features/recipes/service/models/Recipe';

export class RecipesInsertHandler
  implements InsertDataHandler<unknown, RecipeDTO | undefined> {

  canHandle(table: string): boolean {
    return table === Stores.RECIPES;
  }

  transform(data: unknown[]): Array<undefined | RecipeDTO> {
    return data.map(item => {
      if (!(item as any)['uuid']) {
        return undefined
      }
      return Recipe
        .fromRaw(item)
        .toDTO();
    })
  }

  getName(): string {
    return 'RecipesInsertHandler';
  }
}


