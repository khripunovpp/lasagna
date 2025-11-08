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
}; 