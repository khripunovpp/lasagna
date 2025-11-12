/**
 * product service
 */

import {factories} from '@strapi/strapi';

export default factories.createCoreService('api::product.product', {
  batchAdd: async (products: any[], user) => {
    const service = strapi.service('api::product.product');
    const response = {
      added: {},
      errors: {},
      hasErrors: false,
    }
    for (const product of products) {
      try {
        console.log('Creating product:', product);
        product.user = user;
        const newProductResp = await service.create({
          data: product,
        });
        response.added[product.uuid] = {
          documentId: newProductResp.documentId,
        };
      } catch (error) {
        console.error('Error during batchAdd:', error);
        response.errors[product.uuid] = error.message;
        if (!response.hasErrors) {
          response.hasErrors = true;
        }
      }
    }
    return response;
  },

  batchUpdate: async (products: any[], user) => {
    const service = strapi.service('api::product.product');
    const response = {
      updated: {},
      errors: {},
      hasErrors: false,
    }
    for (const product of products) {
      try {
        console.log('Updating product:', product,{
          documentId: product.id,
          data: product.data,
        });
        product.user = user;
        const updatedProductResp = await service.update(product.id,{
          data: product.data,
        });
        response.updated[product.id] = {
          documentId: updatedProductResp.documentId,
        };
      } catch (error) {
        console.error('Error during batchUpdate:', error);
        response.errors[product.uuid] = error.message;
        if (!response.hasErrors) {
          response.hasErrors = true;
        }
      }
    }
    return response;
  }
});
