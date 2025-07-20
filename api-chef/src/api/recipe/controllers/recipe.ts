/**
 * recipe controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::recipe.recipe', ({ strapi }) => ({
  async create(ctx) {
    if (ctx.state.user && ctx.request.body?.data && !ctx.request.body.data.user) {
      ctx.request.body.data.user = ctx.state.user.id;
    }
    const response = await strapi.service('api::recipe.recipe').create(ctx.request.body);
    return await strapi.entityService.findOne('api::recipe.recipe', response.id, ctx.query);
  },
  async update(ctx) {
    if (ctx.state.user && ctx.request.body?.data && !ctx.request.body.data.user) {
      ctx.request.body.data.user = ctx.state.user.id;
    }
    const { id } = ctx.params;
    const response = await strapi.service('api::recipe.recipe').update(id, ctx.request.body);
    return await strapi.entityService.findOne('api::recipe.recipe', response.id, ctx.query);
  },
})); 