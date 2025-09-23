export class RecipeSyncStrategy {
  async sync(recipes: any[], userId: number, strapi: any) {
    const result = {created: 0, updated: 0, errors: [] as any[], toCreate: [], toRemove: []};
    if (recipes && Array.isArray(recipes)) {
      for (const recipe of recipes) {
        try {
          const existingRecipe = await strapi.entityService.findMany('api::recipe.recipe', {
            filters: {uuid: recipe.uuid, user: userId}
          });
          if (existingRecipe.length > 0) {
            const serverRecipe = existingRecipe[0];
            if (serverRecipe.syncedAt && recipe.syncedAt && new Date(serverRecipe.syncedAt) > new Date(recipe.syncedAt)) {
              result.errors.push({
                uuid: recipe.uuid,
                error: 'Server version is newer',
                server: serverRecipe,
                local: recipe
              });
              continue;
            }
            await strapi.entityService.update('api::recipe.recipe', existingRecipe[0].id, {
              data: {
                ...recipe,
                user: userId ? userId : undefined,
                syncedAt: new Date(),
                dirtyToSync: false
              }
            });
            result.updated++;
          } else {
            await strapi.entityService.create('api::recipe.recipe', {
              data: {
                ...recipe,
                user: userId ? userId : undefined,
                syncedAt: new Date(),
                dirtyToSync: false
              }
            });
            result.created++;
          }
        } catch (error: any) {
          result.errors.push({uuid: recipe.uuid, error: error.message});
        }
      }
    }
    // toCreate/toRemove
    const allServer = await strapi.entityService.findMany('api::recipe.recipe', {
      filters: {user: userId}
    });
    const clientUuids = new Set((recipes || []).map((item: any) => item.uuid));
    const serverUuids = new Set((allServer || []).map((item: any) => item.uuid));
    result.toCreate = (allServer || []).filter((item: any) => !clientUuids.has(item.uuid));
    result.toRemove = (recipes || []).filter((item: any) => !serverUuids.has(item.uuid));
    return result;
  }

  async getSyncStatus(userId: number, strapi: any) {
    const recipes = await strapi.entityService.findMany('api::recipe.recipe', {
      filters: {user: userId},
      fields: ['id', 'uuid', 'syncedAt', 'dirtyToSync']
    });
    return {
      total: recipes.length,
      synced: recipes.filter((r: any) => !r.dirtyToSync).length,
      dirty: recipes.filter((r: any) => r.dirtyToSync).length,
      lastSync: recipes.length > 0 ? Math.max(...recipes.map((r: any) => r.syncedAt ? new Date(r.syncedAt).getTime() : 0)) : null
    };
  }

  async getDirtyData(userId: number, strapi: any) {
    return await strapi.entityService.findMany('api::recipe.recipe', {
      filters: {user: userId, dirtyToSync: true}
    });
  }
} 