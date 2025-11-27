export const HOST = 'http://localhost:4200';

export const buildUrl = (path: string): string => `${HOST}${path}`;

export const URLS = {
  product: {
    list: `${HOST}/products`,
    add: `${HOST}/products/add`,
    edit: (id: string) => `${HOST}/products/edit/${id}`,
  },
  recipes: {
    list: `${HOST}/recipes`,
    add: `${HOST}/recipes/add`,
    edit: (id: string) => `${HOST}/recipes/edit/${id}`,
    calculate: (id: string) => `${HOST}/recipes/calculate/${id}`,
  },
  settings: {
    general: `${HOST}/settings`,
    backup: `${HOST}/settings?tab=backup`,
    withTab: (tabName: string) => `${HOST}/settings?tab=${tabName}`,
  }
}
