import {ContentType} from "@strapi/types/dist/uid";
import {factories} from "@strapi/strapi";

export default (
  name: ContentType
) => {
  return factories.createCoreService(name, ({strapi}) => ({
    batchAdd: async (
      items: any[],
      user: any,
    ) => {
      const response = {
        added: {},
        errors: {},
        hasErrors: false,
      }
      for (const item of items) {
        try {
          console.log('Adding item:', item);
          if (!item.uuid) {
            throw new Error('Item is missing uuid');
          }
          item.user = user;
          const newItemResp = await strapi.documents(name).create({
            data: item,
          });
          response.added[item.uuid] = {
            documentId: newItemResp.documentId,
          };
        } catch (error) {
          console.error('Error during batchAdd:', error);
          response.errors[item.uuid] = error.message;
          if (!response.hasErrors) {
            response.hasErrors = true;
          }
        }
      }
      return response;
    },

    batchUpdate: async (
      items: any[],
      user: any,
    ) => {
      const response = {
        updated: {},
        errors: {},
        hasErrors: false,
      }
      for (const item of items) {
        try {
          console.log('Updating item:', item, {
            documentId: item.id,
            data: item.data,
          });
          if (!item.id) {
            throw new Error('Item is missing id');
          }
          item.user = user;
          const updatedItemResp = await strapi.documents(name).update({
            documentId: item.id,
            data: item.data,
          });
          console.log('Updated item response:', updatedItemResp);
          response.updated[item.id] = {
            documentId: updatedItemResp.documentId,
          };
        } catch (error) {
          console.error('Error during batchUpdate:', error);
          response.errors[item.uuid] = error.message;
          if (!response.hasErrors) {
            response.hasErrors = true;
          }
        }
      }
      return response;
    }
  }));
}