declare const window: any;

export const environment = {
  production: false,
  // Версия будет автоматически заменена при билде
  version: (typeof window !== 'undefined' && window.__VERSION__) || 'dev-build',
};
