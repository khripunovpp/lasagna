export default {
  routes: [
    {
      method: 'POST',
      path: '/recipes/batch',
      handler: 'recipe.batch',
      config: {
        auth: {strategies: ['users-permissions']}
      }
    },
  ],
};