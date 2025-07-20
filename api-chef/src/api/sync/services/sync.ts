/**
 * sync service
 */
const { ProductSyncStrategy } = require('./product-sync-strategy');
const { RecipeSyncStrategy } = require('./recipe-sync-strategy');

const strategies = {
  products: new ProductSyncStrategy(),
  recipes: new RecipeSyncStrategy(),
};

export default {
  async syncData(data, userId, strapi) {
    const results = {};
    for (const [key, strategy] of Object.entries(strategies)) {
      if (data[key]) {
        const res = await strategy.sync(data[key], userId, strapi);
        results[key] = res;
      }
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