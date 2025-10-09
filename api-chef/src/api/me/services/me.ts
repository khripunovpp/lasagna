
export default {
  async myProfile(userId, strapi) {
    const profile = await strapi.entityService.findMany('api::profile.profile', {
      filters: { user: userId },
      populate: { user: true },
    });
    return profile.length > 0 ? profile[0] : null;
  },
}; 