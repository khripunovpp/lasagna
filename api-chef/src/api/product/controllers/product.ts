/**
 * product controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::product.product', ({ strapi }) => ({
  async create(ctx) {
    if (ctx.state.user && ctx.request.body?.data && !ctx.request.body.data.user) {
      ctx.request.body.data.user = ctx.state.user.id;
    }
    const response = await strapi.service('api::product.product').create(ctx.request.body);
    return await strapi.entityService.findOne('api::product.product', response.id, ctx.query);
  },
  async update(ctx) {
    if (ctx.state.user && ctx.request.body?.data && !ctx.request.body.data.user) {
      ctx.request.body.data.user = ctx.state.user.id;
    }
    const { id } = ctx.params;
    const response = await strapi.service('api::product.product').update(id, ctx.request.body);
    return await strapi.entityService.findOne('api::product.product', response.id, ctx.query);
  },
}));
