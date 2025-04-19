import {Routes} from '@angular/router';

import {recipeEditResolver} from './service/resolvers/recipe-edit.resolver';
import {recipeCalculationResolver,} from './service/resolvers/recipe-calculation.resolver';
import {recipeCalculationTemplateResolver} from './service/resolvers/recipe-tax-template.resolver';

export const routes: Routes = [{
  path: '',
  children: [
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
    {
      path: 'home',
      loadComponent: () => import('./view/application/application.component')
        .then(m => m.ApplicationComponent)
    },
    {
      path: 'recipes',
      children: [
        {
          path: '',
          loadComponent: () => import('./view/recipe/list/recipes-list.component')
            .then(m => m.RecipesListComponent),
        },
        {
          path: 'add',
          loadComponent: () => import('./view/recipe/recipe-page/recipe-page.component')
            .then(m => m.RecipePageComponent),
        },
        {
          path: 'edit/:uuid',
          loadComponent: () => import('./view/recipe/add-recipe/add-recipe.component')
            .then(m => m.AddRecipeComponent),
          resolve: {
            recipe: recipeEditResolver,
          }
        },
        {
          path: 'calculate/:uuid',
          loadComponent: () => import('./view/recipe/calculate/calculate-recipe.component')
            .then(m => m.CalculateRecipeComponent),
          resolve: {
            result: recipeCalculationResolver,
            template: recipeCalculationTemplateResolver,
          }
        },
      ]
    },

    {
      path: 'products',
      children: [
        {
          path: '',
          loadComponent: () => import('./view/product/list/product-list.component')
            .then(m => m.ProductListComponent),
        },
        {
          path: 'add',
          loadComponent: () => import('./view/product/add-product/add-product.component')
            .then(m => m.AddProductComponent),
        },
        {
          path: 'edit/:uuid',
          loadComponent: () => import('./view/product/add-product/add-product.component')
            .then(m => m.AddProductComponent),
          resolve: {
            product: recipeEditResolver,
          }
        },
      ]
    },

    {
      path: 'settings',
      children: [
        {
          path: '',
          loadComponent: () => import('./view/settings/settings.component')
            .then(m => m.SettingsComponent),
        },
        {
          path: 'categories',
          children: [
            {
              path: 'products',
              children: [
                {
                  path: '',
                  loadComponent: () => import('./view/settings/category/list/category-list.component')
                    .then(m => m.CategoryListComponent),
                },
                {
                  path: 'add',
                  loadComponent: () => import('./view/settings/category/add-category/add-category.component')
                    .then(m => m.AddCategoryComponent)
                },
                {
                  path: 'edit/:uuid',
                  loadComponent: () => import('./view/settings/category/add-category/add-category.component')
                    .then(m => m.AddCategoryComponent)
                }
              ]
            },
            {
              path: 'recipes',
              children: [
                {
                  path: '',
                  loadComponent: () => import('./view/settings/category-recipe/list/category-recipe-list.component')
                    .then(m => m.CategoryRecipeListComponent),
                },
                {
                  path: 'add',
                  loadComponent: () => import('./view/settings/category-recipe/add-category/add-category-recipe.component')
                    .then(m => m.AddCategoryRecipeComponent)

                },
                {
                  path: 'edit/:uuid',
                  loadComponent: () => import('./view/settings/category-recipe/add-category/add-category-recipe.component')
                    .then(m => m.AddCategoryRecipeComponent)
                }
              ]
            }
          ]
        }
      ]
    },


    {
      path: 'widgets',
      loadComponent: () => import('./view/widgets/widgets-page/widgets-page.component')
        .then(m => m.WidgetsPageComponent)
    },

  ]
}];
