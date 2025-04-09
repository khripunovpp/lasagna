import {Stores} from './stores';

export interface SelectResourcesConfig {
  name: string
  loaderConfig?: IndexDbSelectLoaderConfig | LocalstorageSelectLoaderConfig
  transform?: (data: any) => any
}

export interface IndexDbSelectLoaderConfig {
  name: string
  storeName: Stores
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
  recipes: {
    name: 'recipes',
    loaderConfig: {
      name: 'indexDb',
      storeName: Stores.RECIPES,
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
