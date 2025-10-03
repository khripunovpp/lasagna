export class ProductSyncStrategy {
  async sync(
    afterDate: Date,
    userId: number,
    strapi: any,
  ) {
    return await strapi.entityService.findMany('api::product.product', {
      filters: {
        user: userId,
        updatedAt: {
          $gt: afterDate
        }
      }
    });
  }

  async getSyncStatus(userId: number, strapi: any) {
    const products = await strapi.entityService.findMany('api::product.product', {
      filters: {user: userId},
      fields: ['id', 'uuid', 'syncedAt', 'dirtyToSync']
    });
    return {
      total: products.length,
      synced: products.filter((p: any) => !p.dirtyToSync).length,
      dirty: products.filter((p: any) => p.dirtyToSync).length,
      lastSync: products.length > 0 ? Math.max(...products.map((p: any) => p.syncedAt ? new Date(p.syncedAt).getTime() : 0)) : null
    };
  }

  async getDirtyData(userId: number, strapi: any) {
    return await strapi.entityService.findMany('api::product.product', {
      filters: {user: userId, dirtyToSync: true}
    });
  }
} 