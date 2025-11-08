
export default {
  async myProfile(ctx) {
    try {
      if (!ctx.state.user) {
        return ctx.unauthorized('Authentication required');
      }
      const userId = ctx.state.user.id;

      const syncService = strapi.service('api::me.me');
      const result = await syncService.myProfile( userId, strapi);

      return ctx.send(result);
    } catch (error) {
      return ctx.badRequest('Failed getting profile', {error: error.message});
    }
  },
}; 