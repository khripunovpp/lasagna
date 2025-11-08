/**
 * recipe service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::recipe.recipe', {
  batchAdd: async (recipes: any[], user) => {
    const service = strapi.service('api::recipe.recipe');
    const response = {
      added: {},
      errors: {},
      hasErrors: false,
    }
    for (const recipe of recipes) {
      try {
        console.log('Creating recipe:', recipe);
        recipe.user = user;
        const newRecipeResp = await service.create({
          data: recipe,
        });
        response.added[recipe.uuid] = {
          documentId: newRecipeResp.documentId,
        };
      } catch (error) {
        console.error('Error during batchAdd:', error);
        response.errors[recipe.uuid] = error.message;
        if (!response.hasErrors) {
          response.hasErrors = true;
        }
      }
    }
    return response;
  }
});