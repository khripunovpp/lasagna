export enum SettingsKeysConst {
  invoicePrefix = 'invoicePrefix',
  invoiceLogo = 'invoiceLogo',
  pricePrecision = 'pricePrecision',
  currency = 'currency',
  lang = 'lang',
  promoWidgets = 'promoWidgets',
  seenReleaseNotes = 'seenReleaseNotes',
  recipesViewMode = 'recipesViewMode',
  drafts = 'drafts',
}

export interface DraftsSettings {
  enabled: boolean;
  ttlDays: number;
}

export const DRAFTS_TTL_MIN = 1;
export const DRAFTS_TTL_MAX = 30;
export const DRAFTS_DEFAULTS: DraftsSettings = {
  enabled: true,
  ttlDays: DRAFTS_TTL_MAX,
};
