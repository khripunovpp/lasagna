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
        auth: {
          scope: ['authenticated']
        }
      }
    },
    {
      method: 'GET',
      path: '/sync/status/:userId',
      handler: 'sync.getSyncStatus',
      config: {
        auth: {
          scope: ['authenticated']
        }
      }
    },
    {
      method: 'GET',
      path: '/sync/dirty/:userId',
      handler: 'sync.getDirtyData',
      config: {
        auth: {
          scope: ['authenticated']
        }
      }
    }
  ]
}; 