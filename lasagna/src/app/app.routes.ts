import {Routes} from '@angular/router';

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
      path: 'add-recipe',
      loadComponent: () => import('./view/recipe/add-recipe/add-recipe.component')
        .then(m => m.AddRecipeComponent)
    },
    {
      path: 'edit-recipe/:uuid',
      loadComponent: () => import('./view/recipe/add-recipe/add-recipe.component')
        .then(m => m.AddRecipeComponent)
    },
    {
      path: 'calc-recipe/:uuid',
      loadComponent: () => import('./view/recipe/calculate/calculate-recipe.component')
        .then(m => m.CalculateRecipeComponent)
    },
    {
      path: 'recipes',
      loadComponent: () => import('./view/recipe/list/recipes-list.component')
        .then(m => m.RecipesListComponent)
    },



    {
      path: 'add-product',
      loadComponent: () => import('./view/product/add-product/add-product.component')
        .then(m => m.AddProductComponent)
    },
    {
      path: 'edit-product/:uuid',
      loadComponent: () => import('./view/product/add-product/add-product.component')
        .then(m => m.AddProductComponent)
    },
    {
      path: 'products',
      loadComponent: () => import('./view/product/list/product-list.component')
        .then(m => m.ProductListComponent)
    },



    {
      path: 'add-category',
      loadComponent: () => import('./view/category/add-category/add-category.component')
        .then(m => m.AddCategoryComponent)
    },
    {
      path: 'edit-category/:uuid',
      loadComponent: () => import('./view/category/add-category/add-category.component')
        .then(m => m.AddCategoryComponent)
    },
    {
      path: 'categories',
      loadComponent: () => import('./view/category/list/category-list.component')
        .then(m => m.CategoryListComponent)
    },



    {
      path: 'widgets',
      loadComponent: () => import('./view/widgets/widgets-page/widgets-page.component')
        .then(m => m.WidgetsPageComponent)
    }
  ]
}];
