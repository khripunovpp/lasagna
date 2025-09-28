export default ({strapi}) => ({
  async myProfile(
    userId: number,
  ) {
    const profile = await strapi.entityService.findMany('api::profile.profile', {
      filters: {user: userId},
      fields: [
        'canBuy'
      ],
      populate: {
        user: {
          fields: [
            'username',
            'email',
          ]
        },
      },
    });

    if (!profile.length) {
      return null;
    }

    return profile[0];
  },
});