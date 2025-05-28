import {Stores} from './stores';

export const relationsMap: Partial<Record<string, string>> = {
  product_id: `${Stores.PRODUCTS}.uuid`,
  recipe_id: `${Stores.RECIPES}.uuid`,
  tags: `${Stores.TAGS}.uuid`,
  invoice_id: `${Stores.INVOICES}.uuid`,
  credential_id: `${Stores.CREDENTIALS}.uuid`,
}
