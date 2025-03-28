export interface SelectResourcesConfig {
  name: string
  loaderConfig?: Record<string, any>
}

export const resources: Record<string, SelectResourcesConfig> = {
  products: {
    name: 'products',
    loaderConfig: {
      name: 'indexDb',
      storeName: 'productsStore'
    }
  },
  categories: {
    name: 'categories',
    loaderConfig: {
      name: 'indexDb',
      storeName: 'categoryStore'
    }
  },
  recipes: {
    name: 'recipes',
    loaderConfig: {
      name: 'indexDb',
      storeName: 'recipesStore'
    },
  },
}
