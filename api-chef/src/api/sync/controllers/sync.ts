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

      const {afterDate} = ctx.request.body;
      const userId = ctx.state.user.id;

      if (!afterDate) {
        return ctx.badRequest('afterDate is required');
      }

      const syncService = strapi.service('api::sync.sync');
      const result = await syncService.syncData(afterDate, userId, strapi);

      return ctx.send(result);
    } catch (error) {
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