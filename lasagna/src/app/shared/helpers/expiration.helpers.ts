export const EXPIRATION_SOON_THRESHOLD_DAYS = 7;
const MS_PER_DAY = 86_400_000;

export type ExpirationStatus = 'expired' | 'soon' | 'ok' | 'none';

const toMs = (value: number | string | null | undefined): number => {
  if (value == null) return 0;
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0;
  const parsed = new Date(value).getTime();
  return Number.isFinite(parsed) ? parsed : 0;
};

export const getDaysUntilExpiration = (
  expirationDate: number | string | null | undefined,
  now: number = Date.now(),
): number | null => {
  const ms = toMs(expirationDate);
  if (!ms) return null;
  return Math.floor((ms - now) / MS_PER_DAY);
};

export const getExpirationStatus = (
  expirationDate: number | string | null | undefined,
  now: number = Date.now(),
): ExpirationStatus => {
  const days = getDaysUntilExpiration(expirationDate, now);
  if (days === null) return 'none';
  if (days < 0) return 'expired';
  if (days <= EXPIRATION_SOON_THRESHOLD_DAYS) return 'soon';
  return 'ok';
};
