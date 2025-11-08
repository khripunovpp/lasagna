/**
 *  category controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::category.category', ({ strapi }) => ({
  async create(ctx) {
    if (ctx.state.user && ctx.request.body?.data && !ctx.request.body.data.user) {
      ctx.request.body.data.user = ctx.state.user.id;
    }
    const response = await strapi.service('api::category.category').create(ctx.request.body);
    return await strapi.entityService.findOne('api::category.category', response.id, ctx.query);
  },
  async update(ctx) {
    if (ctx.state.user && ctx.request.body?.data && !ctx.request.body.data.user) {
      ctx.request.body.data.user = ctx.state.user.id;
    }
    const { id } = ctx.params;
    const response = await strapi.service('api::category.category').update(id, ctx.request.body);
    return await strapi.entityService.findOne('api::category.category', response.id, ctx.query);
  },
}));
