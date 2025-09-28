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
      if (!ctx.request.body) {
        return ctx.throw(400, 'Missing body data');
      }
      // first try to find existing document for this user
      if (ctx.state.user) {
        const existingDocument: any = await strapi.documents(name)
          .findMany({
            filters: {
              // @ts-ignore
              user: ctx.state.user.id,
            },
          });
        if (existingDocument) {
          return ctx.throw(409, 'Document already exists');
        }
      }

      const response = await strapi.documents(name)
        .create(ctx.request.body);

      return strapi.entityService
        .findOne(name, response.id, ctx.query);
    },

    async update(ctx) {
      if (ctx.state.user && ctx.request.body?.data && !ctx.request.body.data.user) {
        ctx.request.body.data.user = ctx.state.user.id;
      }
      if (!ctx.params.id) {
        return ctx.throw(400, 'Missing id parameter');
      }
      const {id} = ctx.params;

      const existingDocument: any = await strapi.documents(name)
        .findOne({documentId: id});

      // If the user is authenticated, check ownership
      if (ctx.state.user) {
        if (existingDocument.user?.id !== ctx.state.user.id) {
          return ctx.throw(403, 'You do not have permission to update this document');
        }
      } else if (!existingDocument) {
        return ctx.throw(404, 'Document not found');
      }

      const response = await strapi.documents(name)
        .update({
          documentId: id,
          data: ctx.request.body.data,
        });

      return strapi.entityService
        .findOne(name, response.id, ctx.query);
    },

    // delete only data for sertain user if user
    async delete(ctx) {
      if (!ctx.params.id) {
        return ctx.throw(400, 'Missing id parameter');
      }
      const {id} = ctx.params;

      const existingDocument: any = await strapi.documents(name)
        .findOne({documentId: id});

      // If the user is authenticated, check ownership
      if (ctx.state.user) {
        if (existingDocument.user?.id !== ctx.state.user.id) {
          return ctx.throw(403, 'You do not have permission to delete this document');
        }
      } else if (!existingDocument) {
        return ctx.throw(404, 'Document not found');
      }

      await strapi.documents(name)
        .delete({documentId: id});

      return ctx.send({message: 'Document deleted successfully'});
    },

    async findOne(ctx) {
      if (!ctx.params.id) {
        return ctx.throw(400, 'Missing id parameter');
      }
      const {id} = ctx.params;
      const document: any = await strapi.documents(name)
        .findOne({documentId: id});
      // If the user is authenticated, check ownership
      if (ctx.state.user) {
        if (document.user?.id !== ctx.state.user.id) {
          return ctx.throw(403, 'You do not have permission to view this document');
        }
      } else if (!document) {
        return ctx.throw(404, 'Document not found');
      }
      return document;
    },

    async find(ctx) {
      let documents: any[] = [];

      if (ctx.state.user) {
        documents = await strapi.documents(name)
          .findMany({
            ...ctx.query,
            filters: {
              ...ctx.query.filters as Record<any, any>,
              user: ctx.state.user.id,
            } as any,
          });
      } else {
        documents = [];
      }
      return documents;
    },

    async batch(ctx) {
      try {
        const {data} = ctx.request.body;
        if (!data) {
          return ctx.throw(400, 'Missing data query parameter');
        }
        const method = ctx.request.method.toLowerCase();
        let result;
        switch (method) {
          case 'post':
            result = await strapi.service(name)
              .batchAdd(data, ctx.state.user.id);
            break;
          case 'put':
            result = await strapi.service(name)
              .batchUpdate(data, ctx.state.user.id);
            break;
          default:
            return ctx.throw(405, 'Method not allowed');
        }

        console.log(data);
        return ctx.send(result);
      } catch (error) {
        ctx.throw(500, error);
      }
    },
  }));
}
