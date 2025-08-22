import {Stores} from '../db/const/stores';
import {inject} from '@angular/core';
import {
  ProductCategoriesSelectResourceLoader
} from '../../../features/select-resources/product-categories-select-resource.loader';
import {
  RecipesCategoriesSelectResourceLoader
} from '../../../features/select-resources/recipes-categories-select-resource.loader';

export interface SelectResourcesConfig {
  name: string
  loaderConfig?: IndexDbSelectLoaderConfig
    | LocalstorageSelectLoaderConfig
    | CustomSelectLoaderConfig
}

export interface IndexDbSelectLoaderConfig {
  name: string
  storeName: Stores
  selectUniqueKey?: string
  full?: boolean
}

export interface LocalstorageSelectLoaderConfig {
  name: string
  key: string
}

export interface CustomSelectLoaderConfig {
  asyncFactory?: () => Promise<any>
}

export const resources: Record<string, SelectResourcesConfig> = {
  products: {
    name: 'products',
    loaderConfig: {
      name: 'indexDb',
      storeName: Stores.PRODUCTS,
    }
  },
  'product-categories': {
    name: 'product-categories',
    loaderConfig: {
      asyncFactory: () => {
        const loader = inject(ProductCategoriesSelectResourceLoader);
        return loader.load();
      }
    }
  },
  'recipes-categories': {
    name: 'recipes-categories',
    loaderConfig: {
      asyncFactory: () => {
        const loader = inject(RecipesCategoriesSelectResourceLoader);
        return loader.load();
      }
    }
  },
  recipes: {
    name: 'recipes',
    loaderConfig: {
      name: 'indexDb',
      storeName: Stores.RECIPES,
    },
  },
  recipesFull: {
    name: 'recipesFull',
    loaderConfig: {
      name: 'indexDb',
      storeName: Stores.RECIPES,
      full: true,
    },
  },
  'recipes-names': {
    name: 'recipes-names',
    loaderConfig: {
      name: 'indexDb',
      storeName: Stores.RECIPES,
    },
  },
  'products-names': {
    name: 'products-names',
    loaderConfig: {
      name: 'indexDb',
      storeName: Stores.PRODUCTS,
    },
  },
  'sources': {
    name: 'sources',
    loaderConfig: {
      name: 'indexDb',
      storeName: Stores.PRODUCTS,
      selectUniqueKey: 'source',
    },
  },
  'tags': {
    name: 'tags',
    loaderConfig: {
      name: 'indexDb',
      storeName: Stores.TAGS,
    },
  },
}
