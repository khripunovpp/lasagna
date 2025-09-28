export default ({strapi}) => ({
  sync: async (afterDate: Date, userId: number) => {
    return await strapi.entityService
      .findMany('api::recipe.recipe', {
        filters: {
          user: userId,
          updatedAt: {
            $gt: afterDate
          }
        }
      });
  }
});