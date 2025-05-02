import {RecipeDTO} from '../shemes/Recipe.scheme';
import {Stores} from './stores';

export const relationsMap: Partial<Record< string,string>> = {
  product_id: `${Stores.PRODUCTS}.uuid`,
  recipe_id: `${Stores.RECIPES}.uuid`,
  tags: `${Stores.TAGS}.uuid`,
}
