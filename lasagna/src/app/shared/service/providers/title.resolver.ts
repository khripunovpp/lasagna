import {inject} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRouteSnapshot} from '@angular/router';
import {ProductsRepository} from '../../../features/products/service/products.repository';
import {Calculation} from '../../../features/recipes/service/providers/calulate-recipe.service';

export const defTitleResolver = () => {
  const translateService = inject(TranslateService);

  return translateService.instant('app.title');
}

export const recipeTitleResolver = async (route: ActivatedRouteSnapshot) => {
  const translateService = inject(TranslateService);
  const data = await dataResolver(route, 'recipe');

  return translateService.instant('recipe.title', {name: data?.name})
};

export const recipeCalculationTitleResolver = async (route: ActivatedRouteSnapshot) => {
  const translateService = inject(TranslateService);
  const data = await dataResolver<Calculation>(route, 'result');

  return translateService.instant('recipe.title', {name: data?.calculation?.recipeName})
};

const dataResolver = <T = any>(route: ActivatedRouteSnapshot, dataKey: string) => {
  const recipeResolver = route.routeConfig?.resolve?.[dataKey] as (r: ActivatedRouteSnapshot) => T;
  if (recipeResolver) {
    return Promise.resolve(recipeResolver(route));
  }
  return null;
}

export const productTitleResolver = async (route: ActivatedRouteSnapshot) => {
  const translateService = inject(TranslateService);
  const productsRepository = inject(ProductsRepository);

  const productId = route.paramMap.get('uuid');
  if (productId) {
    return productsRepository.getOne(productId).then(product => {
      return translateService.instant('product.title', {name: product?.name})
    }).catch(() => {
      return translateService.instant('app.title')
    });
  }

  return translateService.instant('app.title')
};
