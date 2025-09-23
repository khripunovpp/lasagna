export class ProductSyncStrategy {
  async sync(products: any[], userId: number, strapi: any) {
    const result = {created: 0, updated: 0, errors: [] as any[], toCreate: [], toRemove: []};
    if (products && Array.isArray(products)) {
      for (const product of products) {
        try {
          const existingProduct = await strapi.entityService.findMany('api::product.product', {
            filters: {uuid: product.uuid, user: userId}
          });
          if (existingProduct.length > 0) {
            const serverProduct = existingProduct[0];
            if (serverProduct.syncedAt && product.syncedAt && new Date(serverProduct.syncedAt) > new Date(product.syncedAt)) {
              result.errors.push({
                uuid: product.uuid,
                error: 'Server version is newer',
                server: serverProduct,
                local: product
              });
              continue;
            }
            await strapi.entityService.update('api::product.product', existingProduct[0].id, {
              data: {
                ...product,
                user: userId ? userId : undefined,
                syncedAt: new Date(),
                dirtyToSync: false
              }
            });
            result.updated++;
          } else {
            await strapi.entityService.create('api::product.product', {
              data: {
                ...product,
                user: userId ? userId : undefined,
                syncedAt: new Date(),
                dirtyToSync: false
              }
            });
            result.created++;
          }
        } catch (error: any) {
          result.errors.push({uuid: product.uuid, error: error.message});
        }
      }
    }
    // toCreate/toRemove
    const allServer = await strapi.entityService.findMany('api::product.product', {
      filters: {user: userId}
    });
    const clientUuids = new Set((products || []).map((item: any) => item.uuid));
    const serverUuids = new Set((allServer || []).map((item: any) => item.uuid));
    result.toCreate = (allServer || []).filter((item: any) => !clientUuids.has(item.uuid));
    result.toRemove = (products || []).filter((item: any) => !serverUuids.has(item.uuid));
    return result;
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