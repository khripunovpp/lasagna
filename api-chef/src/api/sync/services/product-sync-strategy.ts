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
} 