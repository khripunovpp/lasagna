/**
 * sync service
 */
const {ProductSyncStrategy} = require('./product-sync-strategy');
const {RecipeSyncStrategy} = require('./recipe-sync-strategy');

const strategies = {
  products: new ProductSyncStrategy(),
  // recipes: new RecipeSyncStrategy(),
};

export default {
  async syncData(afterDate, userId, strapi) {
    const results = {};
    const dateObj = new Date(afterDate);

    for (const [key, strategy] of Object.entries(strategies)) {
      results[key] = await strategy.sync(dateObj, userId, strapi);
    }
    return results;
  },

  async getSyncStatus(userId, strapi) {
    const status = {};
    for (const [key, strategy] of Object.entries(strategies)) {
      status[key] = await strategy.getSyncStatus(userId, strapi);
    }
    return status;
  },

  async getDirtyData(userId, strapi) {
    const dirty = {};
    for (const [key, strategy] of Object.entries(strategies)) {
      dirty[key] = await strategy.getDirtyData(userId, strapi);
    }
    return dirty;
  }
}; 