export default ({strapi}) => ({
  sync: async (afterDate: Date, userId: number) => {
    return await strapi.entityService
      .findMany('api::product.product', {
        filters: {
          user: userId,
          updatedAt: {
            $gt: afterDate
          }
        }
      });
  }
});