import {MetaDefinition} from '@angular/platform-browser';

export const appMeta :Record<string, MetaDefinition[]> = {
  default: [
    { name: 'author', content: 'Lasagna App Team' },
    { name: 'description', content: 'Welcome to Lasagna - Cost Calculator Application' },
  ],
  home: [
    { name: 'description', content: 'Welcome to Lasagna - Cost Calculator Application' },
    { name: 'keywords', content: 'Lasagna, Cost Calculator, Recipes, Ingredients' },
  ],
  recipes: [
    { name: 'description', content: 'Manage your recipes and calculate costs with Lasagna' },
    { name: 'keywords', content: 'Recipes, Cost Calculation, Ingredients, Lasagna' },
  ],
  products: [
    { name: 'description', content: 'Track and manage your products with Lasagna' },
    { name: 'keywords', content: 'Products, Inventory, Management, Lasagna' },
  ],
  invoices: [
    { name: 'description', content: 'Create and manage invoices with Lasagna' },
    { name: 'keywords', content: 'Invoices, Billing, Management, Lasagna' },
  ],
  empty: [
    { name: 'description', content: 'Lasagna - Cost Calculator Application' },
    { name: 'keywords', content: 'Lasagna, Cost Calculator' },
  ],
};
