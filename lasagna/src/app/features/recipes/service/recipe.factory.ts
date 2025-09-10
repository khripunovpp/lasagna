import {Recipe} from './models/Recipe';

export const recipeFactory = () => {
  return new Recipe({});
}

export const clonedRecipeFactory = (recipe: Recipe) => {
  const cloned = recipeFactory();
  cloned.update(recipe.toDTO());
  cloned.uuid = undefined;
  return cloned;
}
