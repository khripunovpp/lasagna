export default {
  routes: [
    {
      method: 'POST',
      path: '/products/batch',
      handler: 'product.batch',
      config: {
        auth: {strategies: ['users-permissions']}
      }
    },
  ],
};