import {Routes} from '@angular/router';
import {CalculateRecipeComponent} from './view/recipe/calculate/calculate-recipe.component';

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
      path:'add-recipe',
      loadComponent: () => import('./view/recipe/add-recipe/add-recipe.component')
        .then(m => m.AddRecipeComponent)
    },
    {
      path:'edit-recipe/:uuid',
      loadComponent: () => import('./view/recipe/add-recipe/add-recipe.component')
        .then(m => m.AddRecipeComponent)
    },
    {
      path:'add-product',
      loadComponent: () => import('./view/product/add-product/add-product.component')
        .then(m => m.AddProductComponent)
    },
    {
      path:'add-category',
      loadComponent: () => import('./view/category/add-category/add-category.component')
        .then(m => m.AddCategoryComponent)
    },
    {
      path:'calc-recipe/:uuid',
      loadComponent: () => import('./view/recipe/calculate/calculate-recipe.component')
        .then(m => m.CalculateRecipeComponent)
    }
  ]
}];
