import {Recipe} from '@service/models/Recipe';
import {CategoryRecipe} from '@service/models/CategoryRecipe';
import {CategoryRecipeDTO} from '@service/db/shemes/CategoryRecipe.scheme';

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
    outcome_amount: recipe.outcome_amount,
    outcome_unit: recipe.outcome_unit,
    uuid: recipe.uuid,
    taxTemplateName: recipe.taxTemplateName,
    category_id: recipe.category_id?.uuid ? {
      uuid: recipe.category_id?.uuid,
    } : null,
    tags: recipe.tags?.map((tag) => tag.toString()) || [],
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
