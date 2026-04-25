import {inject} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRouteSnapshot} from '@angular/router';
import {ProductsRepository} from '../../../features/products/service/products.repository';
import {Calculation} from '../../../features/recipes/service/providers/calulate-recipe.service';
import {IS_CLIENT} from '../tokens/isClient.token';

export const defTitleResolver = () => {
  const translateService = inject(TranslateService);

  return translateService.instant('app.title');
}

export const translationTitleResolver = (translationKey: string) => {
  return () => {
    return inject(TranslateService).instant(translationKey)
  };
}

export const recipeTitleResolver = (route: ActivatedRouteSnapshot) => {
  const translateService = inject(TranslateService);
  const recipeName = route.data?.['recipe']?.name;

  return translateService.instant('recipe.title', {name: recipeName})
};

export const recipeCalculationTitleResolver = (route: ActivatedRouteSnapshot) => {
  const translateService = inject(TranslateService);
  const recipeName = (route.data?.['result'] as Calculation)?.calculation?.recipeName;

  return translateService.instant('recipe.title', {name: recipeName})
};

export const productTitleResolver = async (route: ActivatedRouteSnapshot) => {
  const isBrowser = inject(IS_CLIENT);
  if (!isBrowser) {
    return Promise.resolve('');
  }
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
