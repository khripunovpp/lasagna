/**
 * sync controller
 */

export default {
  async syncData(ctx) {
    try {
      // Проверяем авторизацию пользователя
      if (!ctx.state.user) {
        console.log('[syncData] No user in ctx.state');
        return ctx.unauthorized('Authentication required');
      }

      const {data} = ctx.request.body;
      const userId = ctx.state.user.id;

      console.log('[syncData] userId:', userId);
      console.log('[syncData] incoming data:', JSON.stringify(data, null, 2));

      if (!data) {
        console.log('[syncData] No data in request body');
        return ctx.badRequest('Data is required');
      }

      const syncService = strapi.service('api::sync.sync');
      const result = await syncService.syncData(data, userId, strapi);
      
      console.log('[syncData] result:', JSON.stringify(result, null, 2));
      return ctx.send(result);
    } catch (error) {
      console.error('[syncData] Error:', error);
      return ctx.badRequest('Sync failed', {error: error.message});
    }
  },

  async getSyncStatus(ctx) {
    try {
      // Проверяем авторизацию пользователя
      if (!ctx.state.user) {
        return ctx.unauthorized('Authentication required');
      }

      const userId = ctx.state.user.id;
      const syncService = strapi.service('api::sync.sync');
      const status = await syncService.getSyncStatus(userId, strapi);

      return ctx.send(status);
    } catch (error) {
      return ctx.badRequest('Failed to get sync status', {error: error.message});
    }
  },

  async getDirtyData(ctx) {
    try {
      // Проверяем авторизацию пользователя
      if (!ctx.state.user) {
        return ctx.unauthorized('Authentication required');
      }

      const userId = ctx.state.user.id;
      const syncService = strapi.service('api::sync.sync');
      const dirtyData = await syncService.getDirtyData(userId, strapi);

      return ctx.send(dirtyData);
    } catch (error) {
      return ctx.badRequest('Failed to get dirty data', {error: error.message});
    }
  }
}; 