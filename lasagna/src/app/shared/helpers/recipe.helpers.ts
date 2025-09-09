import {Recipe} from '../../features/recipes/service/models/Recipe';
import {CategoryRecipe} from '../../features/settings/service/models/CategoryRecipe';
import {CategoryRecipeDTO} from '../service/db/shemes/CategoryRecipe.scheme';

export const recipeToFormValue = (recipe: Recipe) => {
  return {
    name: recipe.name,
    description: recipe.description,
    ingredients: recipe.ingredients.map((ingredient) => {
      return {
        name: ingredient.name,
        amount: ingredient.amount,
        unit: ingredient.unit,
      };
    }),
    portions: recipe.portions,
    uuid: recipe.uuid,
    category_id: recipe.category_id?.uuid ? {
      uuid: recipe.category_id?.uuid,
    } : null,
    tags: recipe.tags?.map((tag) => tag.toString()) || [],
    master: recipe.master || false,
  }
}

export const categoryRecipeToFormValue = (category: CategoryRecipe) => {
  return {
    name: category.name,
  }
};

export const categoryRecipeDTOFromFormValue = (categoryFormValue: any): CategoryRecipeDTO => {
  return {
    name: categoryFormValue.name,
  }
}
