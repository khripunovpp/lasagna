
export default {
  routes: [
    {
      method: 'GET',
      path: '/me',
      handler: 'me.myProfile',
      config: {
        auth: {strategies: ['users-permissions']}
      }
    },
  ]
}; 