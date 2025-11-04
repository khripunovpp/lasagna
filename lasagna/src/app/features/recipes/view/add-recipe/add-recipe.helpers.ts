import {Recipe} from '../../service/models/Recipe';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {Ingredient} from '../../service/models/Ingredient';
import {UnitValue} from '../../../../shared/view/const/units.const';
import {RecipeDTO} from '../../service/schemes/Recipe.scheme';

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
    name: new FormControl(ingredient?.name),
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
