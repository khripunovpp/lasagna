export class RecipeSyncStrategy {
  async sync(
    afterDate: Date,
    userId: number,
    strapi: any,
  ) {
    return await strapi.entityService.findMany('api::recipe.recipe', {
      filters: {
        user: userId,
        updatedAt: {
          $gt: afterDate
        }
      }
    });
  }
} 