/**
 * product controller
 */

import {factories} from '@strapi/strapi';
import {ContentType} from "@strapi/types/dist/uid";

export default (
  name: ContentType
) => {
  return factories.createCoreController(name, ({strapi}) => ({
    async create(ctx) {
      if (ctx.state.user && ctx.request.body?.data && !ctx.request.body.data.user) {
        ctx.request.body.data.user = ctx.state.user.id;
      }
      const response = await strapi.service(name).create(ctx.request.body);
      return await strapi.entityService.findOne(name, response.id, ctx.query);
    },

    async update(ctx) {
      if (ctx.state.user && ctx.request.body?.data && !ctx.request.body.data.user) {
        ctx.request.body.data.user = ctx.state.user.id;
      }
      const {id} = ctx.params;
      const response = await strapi.service(name).update(id, ctx.request.body);
      return await strapi.entityService.findOne(name, response.id, ctx.query);
    },

    async batch(ctx) {
      try {
        const {data} = ctx.request.body;
        if (!data) {
          return ctx.throw(400, 'Missing data query parameter');
        }

        const result = await strapi.service(name).batchAdd(data, ctx.state.user.id);
        console.log(data);
        return ctx.send(result);
      } catch (error) {
        ctx.throw(500, error);
      }
    },
  }));
}
