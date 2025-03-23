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
      path:'add-recipe',
      loadComponent: () => import('./view/recipe/add-recipe/add-recipe.component')
        .then(m => m.AddRecipeComponent)
    },
    {
      path:'add-product',
      loadComponent: () => import('./view/product/add-product/add-product.component')
        .then(m => m.AddProductComponent)
    }
  ]
}];
