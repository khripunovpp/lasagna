module.exports = (plugin) => {
  plugin.contentTypes.user.lifecycles = {
    ...plugin.contentTypes.user.lifecycles,
    afterCreate: async (event) => {
      const {result} = event;
      if (!result) return;

      await strapi.db.query('api::profile.profile').create({
        data: {
          user: result.id,
          canBuy: false,
          publishedAt: new Date()
        },
      });
    },
  };

  return plugin;
};