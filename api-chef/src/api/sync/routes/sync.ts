/**
 * sync router
 */

export default {
  routes: [
    {
      method: 'POST',
      path: '/sync/data',
      handler: 'sync.syncData',
      config: {
        auth: {strategies: ['users-permissions']}
      }
    },
  ]
}; 