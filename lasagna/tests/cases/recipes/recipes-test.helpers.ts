import {RecipeDTO} from '../../../src/app/features/recipes/service/schemes/Recipe.scheme';

// Рецепты для тестов. Порядок имеет значение
export const recipesInput: RecipeDTO[] = [
  {
    uuid: 'test-recipe-uuid-1',
    name: 'Test Recipe - all ingredients unit types setup as gram',
    description: 'This is a test recipe description.',
    portions: '4',
    master: true,
    tags: ['test_1', 'test_2'],
    ingredients: [
      {
        product_id: 'test-product-uuid-1',
        amount: '500',
        unit: 'gram',
      },
      {
        product_id: 'test-product-uuid-2',
        amount: '24',
        unit: 'gram',
      },
      {
        product_id: 'test-product-uuid-3',
        amount: '13',
        unit: 'gram',
      },
    ],
  },
  {
    uuid: 'test-recipe-uuid-3',
    name: 'Third Test Recipe - all ingredients unit types setup as kilogram',
    description: 'Third recipe description for testing purposes.',
    portions: '2',
    master: false,
    tags: ['test_1', 'test_2'],
    ingredients: [
      {
        product_id: 'test-product-uuid-1',
        amount: '1.5',
        unit: 'kilogram',
      },
      {
        product_id: 'test-product-uuid-2',
        amount: '0.5',
        unit: 'kilogram',
      },
      {
        product_id: 'test-product-uuid-3',
        amount: '0.2',
        unit: 'kilogram',
      },
    ],
  },
  {
    uuid: 'test-recipe-uuid-2',
    name: 'Another Test Recipe - all ingredients unit types setup as piece',
    description: 'Another description for testing.',
    portions: '4',
    master: false,
    tags: ['test_1', 'test_2'],
    ingredients: [
      {
        product_id: 'test-product-uuid-1',
        amount: '2',
        unit: 'piece',
      },
      {
        product_id: 'test-product-uuid-2',
        amount: '1',
        unit: 'piece',
      },
      {
        product_id: 'test-product-uuid-3',
        amount: '5',
        unit: 'piece',
      },
    ],
  },
  {
    uuid: 'test-recipe-uuid-4',
    name: 'Fourth Test Recipe - mixed ingredient unit types in their own units',
    description: 'Fourth recipe with mixed units for ingredients.',
    portions: '4',
    master: false,
    tags: ['test_1', 'test_2'],
    ingredients: [
      {
        product_id: 'test-product-uuid-1',
        amount: '750',
        unit: 'gram',
      },
      {
        product_id: 'test-product-uuid-2',
        amount: '3',
        unit: 'kilogram',
      },
      {
        product_id: 'test-product-uuid-3',
        amount: '0.5',
        unit: 'piece',
      },
    ],
  },
  {
    uuid: 'test-recipe-uuid-5',
    name: 'Fifth Test Recipe - mix unit types with no their own units',
    description: 'Fifth recipe with mixed units for ingredients without their own units.',
    portions: '2',
    master: false,
    tags: ['test_1', 'test_2'],
    ingredients: [
      {
        product_id: 'test-product-uuid-1',
        amount: '1',
        unit: 'piece',
      },
      {
        product_id: 'test-product-uuid-2',
        amount: '500',
        unit: 'gram',
      },
      {
        product_id: 'test-product-uuid-3',
        amount: '0.75',
        unit: 'kilogram',
      },
    ],
  },
  {
    uuid: 'test-recipe-uuid-8',
    name: 'Sixth Test Recipe - no ingredients',
    description: 'Fifth recipe without any ingredients for testing.',
    portions: '3',
    master: false,
    tags: ['test_1', 'test_2'],
    ingredients: [],
  },
  {
    uuid: 'test-recipe-uuid-6',
    name: 'Seventh Test Recipe - ingredients with recipes as ingredients, all unit types',
    description: 'Seventh recipe with other recipes as ingredients for testing.',
    portions: '3',
    master: false,
    tags: ['test_1', 'test_2'],
    ingredients: [
      {
        recipe_id: 'test-recipe-uuid-1',
        amount: '1',
        unit: 'piece',
      },
      {
        recipe_id: 'test-recipe-uuid-2',
        amount: '0.5',
        unit: 'kilogram',
      },
      {
        recipe_id: 'test-recipe-uuid-3',
        amount: '200',
        unit: 'gram',
      }
    ],
  },
  {
    uuid: 'test-recipe-uuid-7',
    name: 'Eighth Test Recipe - mixed ingredients with products and recipes',
    description: 'Eighth recipe with mixed ingredients including products and recipes.',
    portions: '5',
    master: false,
    tags: ['test_1', 'test_2'],
    ingredients: [
      {
        product_id: 'test-product-uuid-1',
        amount: '300',
        unit: 'gram',
      },
      {
        recipe_id: 'test-recipe-uuid-2',
        amount: '2',
        unit: 'piece',
      },
      {
        product_id: 'test-product-uuid-3',
        amount: '1',
        unit: 'kilogram',
      },
    ],
  }
];
export const recipesCardsOutput: {
  name: string
  editedAt: string
}[] = [
  {
    name: 'Another Test Recipe - all ingredients unit types setup as piece',
    editedAt: 'edited just now',
  },
  {
    name: 'Eighth Test Recipe - mixed ingredients with products and recipes',
    editedAt: 'edited just now',
  },
  {
    name: 'Fifth Test Recipe - mix unit types with no their own units',
    editedAt: 'edited just now',
  },
  {
    name: 'Fourth Test Recipe - mixed ingredient unit types in their own units',
    editedAt: 'edited just now',
  },
  {
    name: 'Seventh Test Recipe - ingredients with recipes as ingredients, all unit types',
    editedAt: 'edited just now',
  },
  {
    name: 'Sixth Test Recipe - no ingredients',
    editedAt: 'edited just now',
  },
  {
    name: 'Test Recipe - all ingredients unit types setup as gram',
    editedAt: 'edited just now',
  },
  {
    name: 'Third Test Recipe - all ingredients unit types setup as kilogram',
    editedAt: 'edited just now',
  },
];
export const recipesProductUUIDToNameMap: { [key: string]: string } = {
  'test-product-uuid-1': 'Test Product',
  'test-product-uuid-2': 'Test Product KG',
  'test-product-uuid-3': 'Test Product Piece',
};
export const recipesRecipeUUIDToNameMap: { [key: string]: string } = {
  'test-recipe-uuid-1': 'Test Recipe - all ingredients unit types setup as gram',
  'test-recipe-uuid-2': 'Another Test Recipe - all ingredients unit types setup as piece',
  'test-recipe-uuid-3': 'Third Test Recipe - all ingredients unit types setup as kilogram',
  'test-recipe-uuid-4': 'Fourth Test Recipe - mixed ingredient unit types in their own units',
  'test-recipe-uuid-5': 'Sixth Test Recipe - mix unit types with no their own units',
  'test-recipe-uuid-6': 'Seventh Test Recipe - ingredients with recipes as ingredients, all unit types',
  'test-recipe-uuid-7': 'Eighth Test Recipe - mixed ingredients with products and recipes',
  'test-recipe-uuid-8': 'Fifth Test Recipe - no ingredients',
  'test-recipe': 'Test Recipe',
};
export const recipesProductUUIDToFullNameMap: { [key: string]: string } = {
  'test-product-uuid-1': 'Test Product - Test Brand (Test Source) - 0.3 $ /gr.',
  'test-product-uuid-2': 'Test Product KG - Test Brand (Test Source) - 150 $ /kg.',
  'test-product-uuid-3': 'Test Product Piece - Test Brand (Test Source) - 7.5 $ /pcs.',
};

// Продукты по умолчанию для рецептов
export const defaultProductsForRecipes = [
  {
    "name": "Condensed milk - for tests",
    "amount": 0,
    "price": 0,
    "unit": "gram",
    "category_id": "dairy",
    "uuid": "condensed-milk-tests",
    "createdAt": 1764539392816,
    "updatedAt": 1764539392816,
    "color": "#6bf9aa",
    "system": false,
    "notes": "Calories: 321 kcal per 100 grams",
    "source": "FoodData Central",
    "brand": "USDA"
  },
  {
    "name": "Cream cheese - for tests",
    "amount": 0,
    "price": 0,
    "unit": "gram",
    "category_id": "dairy",
    "uuid": "cream-cheese-tests",
    "createdAt": 1764539392816,
    "updatedAt": 1764539392816,
    "color": "#679390",
    "system": false,
    "notes": "Calories: 342 kcal per 100 grams",
    "source": "FoodData Central",
    "brand": "USDA"
  },
  {
    "name": "Heavy cream 35% - for tests",
    "amount": 0,
    "price": 0,
    "unit": "gram",
    "category_id": "dairy",
    "uuid": "heavy-cream-35-tests",
    "createdAt": 1764539392816,
    "updatedAt": 1764539392816,
    "color": "#f49a9a",
    "system": false,
    "notes": "Calories: 350 kcal per 100 grams",
    "source": "FoodData Central",
    "brand": "USDA"
  },
  {
    "name": "Milk powder - for tests",
    "amount": 0,
    "price": 0,
    "unit": "gram",
    "category_id": "dairy",
    "uuid": "milk-powder-tests",
    "createdAt": 1764539392816,
    "updatedAt": 1764539392816,
    "color": "#8aa33f",
    "system": false,
    "notes": "Calories: 496 kcal per 100 grams",
    "source": "FoodData Central",
    "brand": "USDA"
  },
  {
    "name": "Sour cream - for tests",
    "amount": 0,
    "price": 0,
    "unit": "gram",
    "category_id": "dairy",
    "uuid": "sour-cream-tests",
    "createdAt": 1764539392816,
    "updatedAt": 1764539392816,
    "color": "#756560",
    "system": false,
    "notes": "Calories: 193 kcal per 100 grams",
    "source": "FoodData Central",
    "brand": "USDA"
  },
  {
    "name": "Whipping cream 30% - for tests",
    "amount": 0,
    "price": 0,
    "unit": "gram",
    "category_id": "dairy",
    "uuid": "whipping-cream-30-tests",
    "createdAt": 1764539392816,
    "updatedAt": 1764539392816,
    "color": "#27bea0",
    "system": false,
    "notes": "Calories: 292 kcal per 100 grams",
    "source": "FoodData Central",
    "brand": "USDA"
  }
];

// Ожидаемые результаты расчетов стоимости рецептов
export const calculationOutputWithoutPortions = [
  {
    name: 'Test Recipe - all ingredients unit types setup as gram Cost Analytics',
    outcomeAmount: '537.00 gr.',
    oneUnitPrice: '0.56 $',
    totalPrice: '3.00 $',
    ingredientsRows: [
      {
        name: 'Test Product - Test Brand (Test Source)',
        amount: '500.00 gr.',
        pricePerUnit: '0.30 $ /gr.',
        totalPrice: '0.15 $',
      },
      {
        name: 'Test Product KG - Test Brand (Test Source)',
        amount: '24.00 gr.',
        pricePerUnit: '150.00 $ /kg.',
        totalPrice: '3.60 $',
      },
      {
        name: 'Test Product Piece - Test Brand (Test Source)',
        amount: '13.00 gr.',
        pricePerUnit: '7.50 $ /pcs.',
        totalPrice: '0.10 $',
      },
    ],
  },
  {
    name: 'Third Test Recipe - all ingredients unit types setup as kilogram Cost Analytics',
    outcomeAmount: '2.00 kg.',
    oneUnitPrice: '1.50 $',
    totalPrice: '3.00 $',
    ingredientsRows: [
      {
        name: 'Test Product - Test Brand (Test Source)',
        amount: '1.50 kg.',
        pricePerUnit: '0.30 $ /gr.',
        totalPrice: '450.00 $',
      },
      {
        name: 'Test Product KG - Test Brand (Test Source)',
        amount: '0.50 kg.',
        pricePerUnit: '150.00 $ /kg.',
        totalPrice: '75.00 $',
      },
      {
        name: 'Test Product Piece - Test Brand (Test Source)',
        amount: '0.20 kg.',
        pricePerUnit: '7.50 $ /pcs.',
        totalPrice: '1.50 $',
      },
    ],
  },
  {
    name: 'Another Test Recipe - all ingredients unit types setup as piece Cost Analytics',
    outcomeAmount: '4.00 pcs.',
    oneUnitPrice: '0.75 $',
    totalPrice: '3.00 $',
    ingredientsRows: [
      {
        name: 'Test Product - Test Brand (Test Source)',
        amount: '2.00 pcs.',
        pricePerUnit: '0.30 $ /gr.',
        totalPrice: '0.60 $',
      },
      {
        name: 'Test Product KG - Test Brand (Test Source)',
        amount: '1.00 pcs.',
        pricePerUnit: '150.00 $ /kg.',
        totalPrice: '150.00 $',
      },
      {
        name: 'Test Product Piece - Test Brand (Test Source)',
        amount: '5.00 pcs.',
        pricePerUnit: '7.50 $ /pcs.',
        totalPrice: '37.50 $',
      },
    ],
  },
  {
    name: 'Fourth Test Recipe - mixed ingredient unit types in their own units Cost Analytics',
    outcomeAmount: '1.25 kg.',
    oneUnitPrice: '2.40 $',
    totalPrice: '3.00 $',
    ingredientsRows: [
      {
        name: 'Test Product - Test Brand (Test Source)',
        amount: '750.00 gr.',
        pricePerUnit: '0.30 $ /gr.',
        totalPrice: '0.23 $',
      },
      {
        name: 'Test Product KG - Test Brand (Test Source)',
        amount: '3.00 pcs.',
        pricePerUnit: '150.00 $ /kg.',
        totalPrice: '450.00 $',
      },
      {
        name: 'Test Product Piece - Test Brand (Test Source)',
        amount: '0.50 kg.',
        pricePerUnit: '7.50 $ /pcs.',
        totalPrice: '3.75 $',
      },
    ],
  },
  {
    name: 'Fifth Test Recipe - mix unit types with no their own units Cost Analytics',
    outcomeAmount: '1.25 kg.',
    oneUnitPrice: '2.40 $',
    totalPrice: '3.00 $',
    ingredientsRows: [
      {
        name: 'Test Product - Test Brand (Test Source)',
        amount: '1.00 pcs.',
        pricePerUnit: '0.30 $ /gr.',
        totalPrice: '0.30 $',
      },
      {
        name: 'Test Product KG - Test Brand (Test Source)',
        amount: '500.00 gr.',
        pricePerUnit: '150.00 $ /kg.',
        totalPrice: '75.00 $',
      },
      {
        name: 'Test Product Piece - Test Brand (Test Source)',
        amount: '0.75 kg.',
        pricePerUnit: '7.50 $ /pcs.',
        totalPrice: '5.63 $',
      },
    ],
  },
  {
    name: 'Sixth Test Recipe - no ingredients Cost Analytics',
    outcomeAmount: '0.00 gr.',
    oneUnitPrice: '0.00 $',
    totalPrice: '0.00 $',
    ingredientsRows: [],
  },
  {
    name: 'Seventh Test Recipe - ingredients with recipes as ingredients, all unit types Cost Analytics',
    outcomeAmount: '1.70 kg.',
    oneUnitPrice: '1.76 $',
    totalPrice: '3.00 $',
    ingredientsRows: [
      {
        name: 'Test Recipe - all ingredients unit types setup as gram',
        amount: '1.00 pcs.',
        pricePerUnit: '0.56 $',
        totalPrice: '0.56 $',
      },
      {
        name: 'Another Test Recipe - all ingredients unit types setup as piece',
        amount: '0.50 kg.',
        pricePerUnit: '0.75 $',
        totalPrice: '0.38 $',
      },
      {
        name: 'Third Test Recipe - all ingredients unit types setup as kilogram',
        amount: '200.00 gr.',
        pricePerUnit: '1.50 $',
        totalPrice: '0.30 $',
      },
    ],
  },
  {
    name: 'Eighth Test Recipe - mixed ingredients with products and recipes Cost Analytics',
    outcomeAmount: '1.60 kg.',
    oneUnitPrice: '1.88 $',
    totalPrice: '3.00 $',
    ingredientsRows: [
      {
        name: 'Test Product - Test Brand (Test Source)',
        amount: '300.00 gr.',
        pricePerUnit: '0.30 $ /gr.',
        totalPrice: '0.09 $',
      },
      {
        name: 'Another Test Recipe - all ingredients unit types setup as piece',
        amount: '2.00 pcs.',
        pricePerUnit: '0.75 $',
        totalPrice: '1.50 $',
      },
      {
        name: 'Test Product Piece - Test Brand (Test Source)',
        amount: '1.00 kg.',
        pricePerUnit: '7.50 $ /pcs.',
        totalPrice: '7.50 $',
      },
    ],
  },
];
export const calculationOutputWithPortions = [
  {
    name: 'Test Recipe - all ingredients unit types setup as gram Cost Analytics',
    outcomeAmount: '4 pcs. / 131 gram',
    oneUnitPrice: '38.4 $',
    totalPrice: '153.6 $',
    ingredientsRows: [
      {
        name: 'Test Product - Test Brand (Test Source)',
        amount: '500 gr.',
        pricePerUnit: '0.3 $ /gr.',
        totalPrice: '150 $',
      },
      {
        name: 'Test Product KG - Test Brand (Test Source)',
        amount: '24 gr.',
        pricePerUnit: '0.15 $ /gr.',
        totalPrice: '3.6 $',
      },
      {
        name: 'Test Product Piece - Test Brand (Test Source)',
        amount: '13 gr.',
        pricePerUnit: '0 $ /gr.',
        totalPrice: '0 $',
      },
    ],
    total: {
      amount: '524 gr.',
      pricePerUnit: '0.29 $ /gr.',
      totalPrice: '153.6 $',
    }
  },
  {
    name: 'Third Test Recipe - all ingredients unit types setup as kilogram Cost Analytics',
    outcomeAmount: '2 pcs. / 1,000 gram',
    oneUnitPrice: '262.5 $',
    totalPrice: '525 $',
    ingredientsRows: [
      {
        name: 'Test Product - Test Brand (Test Source)',
        amount: '1.5 kg.',
        pricePerUnit: '300 $ /kg.',
        totalPrice: '450 $',
      },
      {
        name: 'Test Product KG - Test Brand (Test Source)',
        amount: '0.5 kg.',
        pricePerUnit: '150 $ /kg.',
        totalPrice: '75 $',
      },
      {
        name: 'Test Product Piece - Test Brand (Test Source)',
        amount: '0.2 kg.',
        pricePerUnit: '0 $ /kg.',
        totalPrice: '0 $',
      },
    ],
    total: {
      amount: '2,000 gr.',
      pricePerUnit: '0.26 $ /gr.',
      totalPrice: '525 $',
    }
  },
  {
    name: 'Another Test Recipe - all ingredients unit types setup as piece Cost Analytics',
    outcomeAmount: '4 pcs. / 750 gram',
    oneUnitPrice: '159.38 $',
    totalPrice: '637.5 $',
    ingredientsRows: [
      {
        name: 'Test Product - Test Brand (Test Source)',
        amount: '2 pcs.',
        pricePerUnit: '150 $ /pcs.',
        totalPrice: '300 $',
      },
      {
        name: 'Test Product KG - Test Brand (Test Source)',
        amount: '1 pcs.',
        pricePerUnit: '300 $ /pcs.',
        totalPrice: '300 $',
      },
      {
        name: 'Test Product Piece - Test Brand (Test Source)',
        amount: '5 pcs.',
        pricePerUnit: '7.5 $ /pcs.',
        totalPrice: '37.5 $',
      },
    ],
    total: {
      amount: '3,000 gr.',
      pricePerUnit: '0.21 $ /gr.',
      totalPrice: '637.5 $',
    }
  },
  {
    name: 'Fourth Test Recipe - mixed ingredient unit types in their own units Cost Analytics',
    outcomeAmount: '4 pcs. / 937.5 gram',
    oneUnitPrice: '169.69 $',
    totalPrice: '678.75 $',
    ingredientsRows: [
      {
        name: 'Test Product - Test Brand (Test Source)',
        amount: '750 gr.',
        pricePerUnit: '0.3 $ /gr.',
        totalPrice: '225 $',
      },
      {
        name: 'Test Product KG - Test Brand (Test Source)',
        amount: '3 kg.',
        pricePerUnit: '150 $ /kg.',
        totalPrice: '450 $',
      },
      {
        name: 'Test Product Piece - Test Brand (Test Source)',
        amount: '0.5 pcs.',
        pricePerUnit: '7.5 $ /pcs.',
        totalPrice: '3.75 $',
      },
    ],
    total: {
      amount: '3,750 gr.',
      pricePerUnit: '0.18 $ /gr.',
      totalPrice: '678.75 $',
    }
  },
  {
    name: 'Fifth Test Recipe - mix unit types with no their own units Cost Analytics',
    outcomeAmount: '2 pcs. / 500 gram',
    oneUnitPrice: '112.5 $',
    totalPrice: '225 $',
    ingredientsRows: [
      {
        name: 'Test Product - Test Brand (Test Source)',
        amount: '1 pcs.',
        pricePerUnit: '150 $ /pcs.',
        totalPrice: '150 $',
      },
      {
        name: 'Test Product KG - Test Brand (Test Source)',
        amount: '500 gr.',
        pricePerUnit: '0.15 $ /gr.',
        totalPrice: '75 $',
      },
      {
        name: 'Test Product Piece - Test Brand (Test Source)',
        amount: '0.75 kg.',
        pricePerUnit: '0 $ /kg.',
        totalPrice: '0 $',
      },
    ],
    total: {
      amount: '1,000 gr.',
      pricePerUnit: '0.23 $ /gr.',
      totalPrice: '225 $',
    }
  },
  {
    name: 'Sixth Test Recipe - no ingredients Cost Analytics',
    noIngredients: true,
    ingredientsRows: [],
  },
  {
    name: 'Seventh Test Recipe - ingredients with recipes as ingredients, all unit types Cost Analytics',
    outcomeAmount: '3 pcs. / 277 gram',
    oneUnitPrice: '65.72 $',
    totalPrice: '197.15 $',
    ingredientsRows: [
      {
        name: 'Test Recipe - all ingredients unit types setup as gram',
        amount: '1 pcs.',
        pricePerUnit: '38.4 $ /pcs.',
        totalPrice: '38.4 $',
      },
      {
        name: 'Another Test Recipe - all ingredients unit types setup as piece',
        amount: '0.5 kg.',
        pricePerUnit: '212.5 $ /kg.',
        totalPrice: '106.25 $',
      },
      {
        name: 'Third Test Recipe - all ingredients unit types setup as kilogram',
        amount: '200 gr.',
        pricePerUnit: '0.26 $ /gr.',
        totalPrice: '52.5  $',
      },
    ],
    total: {
      amount: '831 gr.',
      pricePerUnit: '0.24 $ /gr.',
      totalPrice: '197.15 $',
    }
  },
  {
    name: 'Eighth Test Recipe - mixed ingredients with products and recipes Cost Analytics',
    outcomeAmount: '5 pcs. / 360 gram',
    oneUnitPrice: '81.75 $',
    totalPrice: '408.75 $',
    ingredientsRows: [
      {
        name: 'Test Product - Test Brand (Test Source)',
        amount: '300 gr.',
        pricePerUnit: '0.3 $ /gr.',
        totalPrice: '90 $',
      },
      {
        name: 'Another Test Recipe - all ingredients unit types setup as piece',
        amount: '2 pcs.',
        pricePerUnit: '159.38 $ /pcs.',
        totalPrice: '318.75 $',
      },
      {
        name: 'Test Product Piece - Test Brand (Test Source)',
        amount: '1 kg.',
        pricePerUnit: '0 $ /kg.',
        totalPrice: '0 $',
      },
    ],
    total: {
      amount: '1,800 gr.',
      pricePerUnit: '0.23 $ /gr.',
      totalPrice: '408.75 $',
    }
  },
];
