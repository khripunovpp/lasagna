/**
 * sync service
 */

export default ({strapi}) => ({
  strategies: {
    products: strapi.service('api::sync.product-sync-strategy'),
    recipes: strapi.service('api::sync.recipe-sync-strategy'),
  },

  async syncData(afterDate, userId) {
    const results = {};
    const dateObj = new Date(afterDate);

    for (const [key, strategy] of Object.entries(this.strategies)) {
      results[key] = await strategy.sync(dateObj, userId, strapi);
    }
    return results;
  },
});