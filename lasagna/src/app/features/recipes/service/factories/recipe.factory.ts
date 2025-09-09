import {Recipe} from '../models/Recipe';

export const recipeFactory = () => {
  return new Recipe({});
}

export const copyRecipeFactory = (recipe: Recipe) => {
  const copy = new Recipe(recipe.toDTO());
  copy.uuid = undefined;
  copy.createdAt = Date.now();
  copy.updatedAt = Date.now();
  return copy;
}
