import {Routes} from '@angular/router';
import {recipeEditResolver} from './features/recipes/service/resolvers/recipe-edit.resolver';
import {recipeCalculationResolver,} from './features/recipes/service/resolvers/recipe-calculation.resolver';
import {recipeCalculationTemplateResolver} from './features/recipes/service/resolvers/recipe-tax-template.resolver';
import {recipeDraftResolver} from './features/recipes/service/resolvers/recipe-draft.resolver';
import {productDraftResolver} from './features/products/service/product-draft.resolver';
import {invoiceEditResolver} from '@invoices/service/invoice-route.resolver';
import {InvoiceBuilderService} from '@invoices/view/invoice-builder.service';
import {LOGGER_CONTEXT} from './features/logger/logger-context.provider';
import {LoggerService} from './features/logger/logger.service';
import {inject} from '@angular/core';
import {BrowserTabTrackingService} from './shared/service/services/browser-tab-tracking.service';
import {NotificationsService} from './shared/service/services';
import {TranslateService} from '@ngx-translate/core';

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
      children: [
        {
          path: '',
          loadComponent: () => import('./features/home/view/application/application.component')
            .then(m => m.ApplicationComponent),
          data: {
            canSeePolicies: true,
          }
        }
      ]
    },
    {
      path: 'recipes',
      children: [
        {
          path: '',
          loadComponent: () => import('./features/recipes/view/list/recipes-list.component')
            .then(m => m.RecipesListComponent),
        },
        {
          path: 'add',
          loadComponent: () => import('./features/recipes/view/add-recipe/add-recipe.component')
            .then(m => m.AddRecipeComponent),
        },
        {
          path: 'edit/:uuid',
          loadComponent: () => import('./features/recipes/view/add-recipe/add-recipe.component')
            .then(m => m.AddRecipeComponent),
          resolve: {
            recipe: recipeEditResolver,
          },
          data: {
            editRoute: true,
          }
        },
        {
          path: 'draft/:uuid',
          loadComponent: () => import('./features/recipes/view/add-recipe/add-recipe.component')
            .then(m => m.AddRecipeComponent),
          resolve: {
            draft: recipeDraftResolver,
          },
          data: {
            draftRoute: true,
          }
        },
        {
          path: 'calculate/:uuid',
          loadComponent: () => import('./features/recipes/view/calculate/calculate-recipe.component')
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
          loadComponent: () => import('./features/products/view/list/product-list.component')
            .then(m => m.ProductListComponent),
        },
        {
          path: 'add',
          loadComponent: () => import('./features/products/view/add-product/add-product.component')
            .then(m => m.AddProductComponent),
        },
        {
          path: 'edit/:uuid',
          loadComponent: () => import('./features/products/view/add-product/add-product.component')
            .then(m => m.AddProductComponent),
          resolve: {
            product: recipeEditResolver,
          },
          data: {
            editRoute: true,
          }
        },
        {
          path: 'draft/:uuid',
          loadComponent: () => import('./features/products/view/add-product/add-product.component')
            .then(m => m.AddProductComponent),
          resolve: {
            draft: productDraftResolver,
          },
          data: {
            draftRoute: true,
          }
        },
      ]
    },

    {
      path: 'invoices',
      providers: [
        LoggerService,
        {
          provide: LOGGER_CONTEXT,
          useValue: {
            label: 'Invoices',
            color: '#e67e22',
          },
        },
      ],
      children: [
        {
          path: '',
          loadComponent: () => import('./features/invoices/view/list/invoices-list.component')
            .then(m => m.InvoicesListComponent),
        },
        {
          path: 'edit/:uuid',
          loadComponent: () => import('./features/invoices/view/add-invoice/add-invoice.component')
            .then(m => m.AddInvoiceComponent),
          providers: [
            InvoiceBuilderService
          ],
          resolve: {
            invoice: invoiceEditResolver,
          },
          data: {
            editRoute: true,
          },
          canDeactivate: [
            () => {
              const browserTabTrackingService = inject(BrowserTabTrackingService);
              const notificationsService = inject(NotificationsService);
              if (browserTabTrackingService.hasUnsavedChanges) {
                const translateService = inject(TranslateService);
                notificationsService.warning(translateService.instant('unsaved-changes-warning'));
                return false; // Prevent navigation if there are unsaved changes
              }

              return true;
            },
          ]
        },
      ]
    },

    {
      path: 'settings',
      children: [
        {
          path: '',
          loadComponent: () => import('./features/settings/view/settings.component')
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
                  loadComponent: () => import('./features/settings/view/categories/category-product/list/category-list.component')
                    .then(m => m.CategoryListComponent),
                },
                {
                  path: 'add',
                  loadComponent: () => import('./features/settings/view/categories/category-product/add-category/add-category.component')
                    .then(m => m.AddCategoryComponent)
                },
                {
                  path: 'edit/:uuid',
                  loadComponent: () => import('./features/settings/view/categories/category-product/add-category/add-category.component')
                    .then(m => m.AddCategoryComponent)
                }
              ]
            },
            {
              path: 'recipes',
              children: [
                {
                  path: '',
                  loadComponent: () => import('./features/settings/view/categories/category-recipe/list/category-recipe-list.component')
                    .then(m => m.CategoryRecipeListComponent),
                },
                {
                  path: 'add',
                  loadComponent: () => import('./features/settings/view/categories/category-recipe/add-category/add-category-recipe.component')
                    .then(m => m.AddCategoryRecipeComponent)

                },
                {
                  path: 'edit/:uuid',
                  loadComponent: () => import('./features/settings/view/categories/category-recipe/add-category/add-category-recipe.component')
                    .then(m => m.AddCategoryRecipeComponent)
                }
              ]
            }
          ]
        },
        {
          path: 'taxes',
          children: [
            {
              path: '',
              loadComponent: () => import('./features/settings/view/finance-settings/taxes/taxes-settings.component')
                .then(m => m.TaxesSettingsComponent)
            },
          ],
        }
      ]
    },


    {
      path: 'widgets',
      loadComponent: () => import('./features/widgets/widgets-page/widgets-page.component')
        .then(m => m.WidgetsPageComponent)
    },

    {
      path: 'docs',
      loadComponent: () => import('./features/documentation/view/documentation-container.component')
        .then(m => m.DocumentationContainerComponent),
      children: [
        {
          path: '**',

          loadComponent: () => import('./features/documentation/view/article.component')
            .then(m => m.ArticleComponent),
        }
      ],
      data:{
        canSeeAuthors: true,
      }
    },

    {
      path: 'dev',
      loadComponent: () => import('./shared/view/dev/color-palette.component')
        .then(m => m.ColorPaletteComponent),
    },

    {
      path: '**',
      loadComponent: () => import('./shared/view/ui/error-page-404.component')
        .then(m => m.ErrorPage404Component),
    }
  ]
}];
