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
  }
});
