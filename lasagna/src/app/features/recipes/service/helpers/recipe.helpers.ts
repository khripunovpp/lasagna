import {Recipe} from '../models/Recipe';
import {CategoryRecipe} from '../../../settings/service/models/CategoryRecipe';
import {CategoryRecipeDTO} from '../../../../shared/service/db/shemes/CategoryRecipe.scheme';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {UnitValue} from '../../../../shared/view/const/units.const';
import {Ingredient} from '../models/Ingredient';
import {RecipeDTO} from '../schemes/Recipe.scheme';

export const recipeToFormValue = (recipe: Recipe) => {
  return {
    name: recipe.name,
    description: recipe.description,
    ingredients: recipe.ingredients.map((ingredient) => {
      return {
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

export const getIngredientGroup = (
  form: FormGroup,
  ingredient?: Recipe['ingredients'][number],
  recipeUUID?: string,
) => {
  let active_tab = getLastRowType(form);

  if (ingredient?.recipe_id) {
    active_tab = 'recipe';
  } else if (ingredient?.product_id) {
    active_tab = 'product';
  }

  return new FormGroup({
    amount: new FormControl(ingredient?.amount?.toString() ?? null),
    product_id: new FormControl(ingredient?.product_id ? ingredient.product_id : null),
    recipe_id: new FormControl(ingredient?.recipe_id ? ingredient.recipe_id : null),
    new_product_name: new FormControl(''),
    active_tab: new FormControl(active_tab),
    unit: new FormControl(ingredient?.unit ?? UnitValue.GRAM),
  }, (group) => {
    const ingredient = Ingredient.fromRaw(group.value);
    if (ingredient.allEmpty
      || group.value.new_product_name) {
      return null
    }
    if (ingredient.typeSelected && !ingredient.amountValid) {
      return {
        ingredientAmountRequired: true
      }
    }
    if (!recipeUUID) return null;
    if (checkCycleRecipe([group.value], recipeUUID)) {
      return {cycleRecipe: true};
    }

    if (!ingredient.typeSelected) {
      return {ingredientRequired: true};
    }

    return null;
  });
}

export const checkCycleRecipe = (
  ingredients: RecipeDTO['ingredients'],
  recipeUUID: string
) => {
  let match = false;
  for (const ingr of ingredients) {
    const hasSubRecipe = ingr.recipe_id?.uuid;
    if (hasSubRecipe && hasSubRecipe === recipeUUID) {
      match = true;
      break;
    }
  }
  return match;
}

export const getLastRowType = (
  form: FormGroup,
): string => {
  if (!form) return 'product';
  const ingredients = form.get('ingredients') as FormArray;
  const lastRow = ingredients.at(ingredients.length - 1);
  if (lastRow && lastRow.value) {
    return lastRow.value.active_tab;
  }
  return 'product';
}
