import {Stores} from '../db/const/stores';

export interface SelectResourcesConfig {
  name: string
  loaderConfig?: IndexDbSelectLoaderConfig | LocalstorageSelectLoaderConfig
  transform?: (data: any) => any
}

export interface IndexDbSelectLoaderConfig {
  name: string
  storeName: Stores
  selectUniqueKey?: string
}

export interface LocalstorageSelectLoaderConfig {
  name: string
  key: string
}

export const resources: Record<string, SelectResourcesConfig> = {
  products: {
    name: 'products',
    loaderConfig: {
      name: 'indexDb',
      storeName: Stores.PRODUCTS,
    }
  },
  categories: {
    name: 'categories',
    loaderConfig: {
      name: 'indexDb',
      storeName: Stores.PRODUCTS_CATEGORIES,
    }
  },
  'recipes-categories': {
    name: 'recipes-categories',
    loaderConfig: {
      name: 'indexDb',
      storeName: Stores.RECIPES_CATEGORIES,
    }
  },
  recipes: {
    name: 'recipes',
    loaderConfig: {
      name: 'indexDb',
      storeName: Stores.RECIPES,
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
  taxTemplates: {
    name: 'taxTemplates',
    loaderConfig: {
      name: 'localStorage',
      key: 'template-tax',
    },
    transform: (data: any) => {
      if (data) {
        return data;
      }
      return [];
    }
  },
}
