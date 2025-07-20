/**
 * sync service
 */

export default {
  async syncData(data, userId) {
    const { products, categories, recipes, ingredients } = data;
    const results = {
      products: { created: 0, updated: 0, errors: [] },
      categories: { created: 0, updated: 0, errors: [] },
      recipes: { created: 0, updated: 0, errors: [] },
      ingredients: { created: 0, updated: 0, errors: [] }
    };

    // Sync products
    if (products && Array.isArray(products)) {
      for (const product of products) {
        try {
          const existingProduct = await strapi.entityService.findMany('api::product.product', {
            filters: { uuid: product.uuid, user: userId }
          });

          if (existingProduct.length > 0) {
            await strapi.entityService.update('api::product.product', existingProduct[0].id, {
              data: {
                ...product,
                user: userId,
                syncedAt: new Date(),
                dirtyToSync: false
              }
            });
            results.products.updated++;
          } else {
            await strapi.entityService.create('api::product.product', {
              data: {
                ...product,
                user: userId,
                syncedAt: new Date(),
                dirtyToSync: false
              }
            });
            results.products.created++;
          }
        } catch (error) {
          results.products.errors.push({ uuid: product.uuid, error: error.message });
        }
      }
    }

    // Sync categories
    if (categories && Array.isArray(categories)) {
      for (const category of categories) {
        try {
          const existingCategory = await strapi.entityService.findMany('api::category.category', {
            filters: { uuid: category.uuid, user: userId }
          });

          if (existingCategory.length > 0) {
            await strapi.entityService.update('api::category.category', existingCategory[0].id, {
              data: {
                ...category,
                user: userId,
                syncedAt: new Date(),
                dirtyToSync: false
              }
            });
            results.categories.updated++;
          } else {
            await strapi.entityService.create('api::category.category', {
              data: {
                ...category,
                user: userId,
                syncedAt: new Date(),
                dirtyToSync: false
              }
            });
            results.categories.created++;
          }
        } catch (error) {
          results.categories.errors.push({ uuid: category.uuid, error: error.message });
        }
      }
    }

    // Sync recipes
    if (recipes && Array.isArray(recipes)) {
      for (const recipe of recipes) {
        try {
          const existingRecipe = await strapi.entityService.findMany('api::recipe.recipe', {
            filters: { uuid: recipe.uuid, user: userId }
          });

          if (existingRecipe.length > 0) {
            await strapi.entityService.update('api::recipe.recipe', existingRecipe[0].id, {
              data: {
                ...recipe,
                user: userId,
                syncedAt: new Date(),
                dirtyToSync: false
              }
            });
            results.recipes.updated++;
          } else {
            await strapi.entityService.create('api::recipe.recipe', {
              data: {
                ...recipe,
                user: userId,
                syncedAt: new Date(),
                dirtyToSync: false
              }
            });
            results.recipes.created++;
          }
        } catch (error) {
          results.recipes.errors.push({ uuid: recipe.uuid, error: error.message });
        }
      }
    }

    // Sync ingredients
    if (ingredients && Array.isArray(ingredients)) {
      for (const ingredient of ingredients) {
        try {
          const existingIngredient = await strapi.entityService.findMany('api::ingredient.ingredient', {
            filters: { uuid: ingredient.uuid }
          });

          if (existingIngredient.length > 0) {
            await strapi.entityService.update('api::ingredient.ingredient', existingIngredient[0].id, {
              data: {
                ...ingredient,
                syncedAt: new Date(),
                dirtyToSync: false
              }
            });
            results.ingredients.updated++;
          } else {
            await strapi.entityService.create('api::ingredient.ingredient', {
              data: {
                ...ingredient,
                syncedAt: new Date(),
                dirtyToSync: false
              }
            });
            results.ingredients.created++;
          }
        } catch (error) {
          results.ingredients.errors.push({ uuid: ingredient.uuid, error: error.message });
        }
      }
    }

    return results;
  },

  async getSyncStatus(userId) {
    const [products, categories, recipes, ingredients] = await Promise.all([
      strapi.entityService.findMany('api::product.product', {
        filters: { user: userId },
        fields: ['id', 'uuid', 'syncedAt', 'dirtyToSync']
      }),
      strapi.entityService.findMany('api::category.category', {
        filters: { user: userId },
        fields: ['id', 'uuid', 'syncedAt', 'dirtyToSync']
      }),
      strapi.entityService.findMany('api::recipe.recipe', {
        filters: { user: userId },
        fields: ['id', 'uuid', 'syncedAt', 'dirtyToSync']
      }),
      strapi.entityService.findMany('api::ingredient.ingredient', {
        fields: ['id', 'uuid', 'syncedAt', 'dirtyToSync']
      })
    ]);

    return {
      products: {
        total: products.length,
        synced: products.filter(p => !p.dirtyToSync).length,
        dirty: products.filter(p => p.dirtyToSync).length,
        lastSync: products.length > 0 ? Math.max(...products.map(p => p.syncedAt ? new Date(p.syncedAt).getTime() : 0)) : null
      },
      categories: {
        total: categories.length,
        synced: categories.filter(c => !c.dirtyToSync).length,
        dirty: categories.filter(c => c.dirtyToSync).length,
        lastSync: categories.length > 0 ? Math.max(...categories.map(c => c.syncedAt ? new Date(c.syncedAt).getTime() : 0)) : null
      },
      recipes: {
        total: recipes.length,
        synced: recipes.filter(r => !r.dirtyToSync).length,
        dirty: recipes.filter(r => r.dirtyToSync).length,
        lastSync: recipes.length > 0 ? Math.max(...recipes.map(r => r.syncedAt ? new Date(r.syncedAt).getTime() : 0)) : null
      },
      ingredients: {
        total: ingredients.length,
        synced: ingredients.filter(i => !i.dirtyToSync).length,
        dirty: ingredients.filter(i => i.dirtyToSync).length,
        lastSync: ingredients.length > 0 ? Math.max(...ingredients.map(i => i.syncedAt ? new Date(i.syncedAt).getTime() : 0)) : null
      }
    };
  },

  async getDirtyData(userId) {
    const [products, categories, recipes, ingredients] = await Promise.all([
      strapi.entityService.findMany('api::product.product', {
        filters: { user: userId, dirtyToSync: true }
      }),
      strapi.entityService.findMany('api::category.category', {
        filters: { user: userId, dirtyToSync: true }
      }),
      strapi.entityService.findMany('api::recipe.recipe', {
        filters: { user: userId, dirtyToSync: true }
      }),
      strapi.entityService.findMany('api::ingredient.ingredient', {
        filters: { dirtyToSync: true }
      })
    ]);

    return {
      products,
      categories,
      recipes,
      ingredients
    };
  }
}; 