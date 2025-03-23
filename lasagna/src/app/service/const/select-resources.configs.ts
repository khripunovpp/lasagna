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
  }
}
