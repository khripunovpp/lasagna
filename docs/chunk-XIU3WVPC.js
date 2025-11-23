import {
  HttpErrorResponse
} from "./chunk-VVQKNBNV.js";

// src/app/shared/helpers/error.helper.ts
var errorHandler = (error) => {
  if (error instanceof Error) {
    return error.message;
  }
  if (error instanceof HttpErrorResponse) {
    const err = error.error;
    if (err?.error?.details?.errors && Array.isArray(err.error.details.errors)) {
      return err.error.details.errors.map((e) => {
        const path = e.path?.join(".") || "unknown";
        const message = e.message || "Unknown validation error";
        const value = e.value !== void 0 ? ` (value: ${e.value})` : "";
        return `${path}: ${message}${value}`;
      }).join("; ");
    }
    return err?.error?.message || error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  if (typeof error === "object" && error !== null) {
    if ("error" in error && "details" in error.error) {
      const details = error.error.details;
      if (details.errors && Array.isArray(details.errors)) {
        return details.errors.map((e) => {
          const path = e.path?.join(".") || "unknown";
          const message = e.message || "Unknown validation error";
          const value = e.value !== void 0 ? ` (value: ${e.value})` : "";
          return `${path}: ${message}${value}`;
        }).join("; ");
      }
      return error.error.message || JSON.stringify(error);
    }
    return JSON.stringify(error);
  }
  return "Unknown error";
};
var parseZodError = (error) => {
  if (!error) {
    return "Unknown validation error";
  }
  return error.errors.map((issue) => {
    const path = issue.path.length > 0 ? issue.path.join(" \u2192 ") : "root";
    return `${path}: ${issue.message}`;
  }).join("\n");
};

// src/app/shared/helpers/product.helpers.ts
var productToFormValue = (product) => {
  return {
    name: product?.name || null,
    amount: product?.amount || null,
    unit: product?.unit || "gram",
    price: product?.price || null,
    source: product?.source || null,
    brand: product?.brand || null,
    notes: product?.notes || null,
    category_id: product?.category_id?.toUUID() || null
  };
};
var categoryProductToFormValue = (category) => {
  return {
    name: category.name || null
  };
};
var categoryProductDTOFromFormValue = (categoryFormValue) => {
  return {
    name: categoryFormValue.name || ""
  };
};
var hasMicroPrice = (price) => {
  if (!price)
    return false;
  return price < 0.01;
};

// src/app/shared/helpers/recipe.helpers.ts
var recipeToFormValue = (recipe) => {
  return {
    name: recipe.name,
    description: recipe.description,
    ingredients: recipe.ingredients.map((ingredient) => {
      return {
        name: ingredient.name,
        amount: ingredient.amount,
        unit: ingredient.unit
      };
    }),
    portions: recipe.portions,
    uuid: recipe.uuid,
    category_id: recipe.category_id?.uuid ? {
      uuid: recipe.category_id?.uuid
    } : null,
    tags: recipe.tags?.map((tag) => tag.toString()) || [],
    master: recipe.master || false
  };
};
var categoryRecipeToFormValue = (category) => {
  return {
    name: category.name
  };
};
var categoryRecipeDTOFromFormValue = (categoryFormValue) => {
  return {
    name: categoryFormValue.name
  };
};

// src/app/shared/helpers/grouping.helper.ts
var groupBy = (array, key) => {
  return array.reduce((result, currentItem) => {
    const groupKey = currentItem[key] || "unknown";
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(currentItem);
    return result;
  }, {});
};

// src/app/shared/helpers/number.helper.ts
var parseFloatingNumber = (value) => {
  if (typeof value === "number") {
    return value;
  }
  if (typeof value === "string") {
    const normalized = value.replace(",", ".");
    const parsed = parseFloat(normalized);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};

export {
  parseFloatingNumber,
  errorHandler,
  parseZodError,
  groupBy,
  productToFormValue,
  categoryProductToFormValue,
  categoryProductDTOFromFormValue,
  hasMicroPrice,
  recipeToFormValue,
  categoryRecipeToFormValue,
  categoryRecipeDTOFromFormValue
};
//# sourceMappingURL=chunk-XIU3WVPC.js.map
