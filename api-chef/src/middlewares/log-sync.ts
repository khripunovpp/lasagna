const logSync = (config: any, { strapi }: any) => {
  return async (ctx: any, next: any) => {
    if (ctx.request.url.startsWith('/api/sync')) {
      strapi.log.info(`[log-sync] sync request: ${ctx.request.method} ${ctx.request.url}`);
      strapi.log.info(`[log-sync] headers: ${JSON.stringify(ctx.request.headers)}`);
    }
    await next();
  };
};

export default logSync; 