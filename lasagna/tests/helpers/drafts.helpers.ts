import {Page} from '@playwright/test';

/**
 * Storage keys are hard-coded in the repositories
 * (see ProductsRepository.saveDraftProduct → 'draft_products' and
 * RecipesRepository.saveDraftRecipe → 'draft_recipes').
 */
export type DraftStore = 'draft_products' | 'draft_recipes';

export interface SeededDraft {
  uuid: string;
  name: string;
  /** Days ago for the draft's age timestamp. */
  agedDays: number;
  /** When set, treats the draft as recently edited — adds updatedAt. */
  editedDaysAgo?: number;
  /** Hours ago for graceStartedAt (use to test the post-TTL grace window). */
  graceStartedHoursAgo?: number;
  /** When set, this is an "edit"-type draft pointing to an existing entity. */
  originalUuid?: string;
}

export const DAY_MS = 24 * 60 * 60 * 1000;
export const HOUR_MS = 60 * 60 * 1000;

/**
 * Replaces the localStorage entry under `store` with the given drafts.
 * Mirrors the shape produced by DraftFormsService.setDraftForm /
 * updateDraftForm (see src/app/shared/service/services/draft-forms.service.ts):
 *   { [uuid]: { uuid, createdAt, updatedAt?, mode, meta, data, graceStartedAt? } }
 */
export async function seedDrafts(
  page: Page,
  store: DraftStore,
  drafts: SeededDraft[],
): Promise<void> {
  await page.evaluate(
    (args) => {
      const [storeKey, items, dayMs, hourMs] = args as [string, SeededDraft[], number, number];
      const now = Date.now();
      const map: Record<string, unknown> = {};
      for (const d of items) {
        const draft: Record<string, unknown> = {
          uuid: d.uuid,
          createdAt: now - d.agedDays * dayMs,
          mode: d.originalUuid ? 'edit' : 'add',
          meta: d.originalUuid ? {uuid: d.originalUuid} : {},
          data: {name: d.name},
        };
        if (d.editedDaysAgo !== undefined) {
          draft['updatedAt'] = now - d.editedDaysAgo * dayMs;
        }
        if (d.graceStartedHoursAgo !== undefined) {
          draft['graceStartedAt'] = now - d.graceStartedHoursAgo * hourMs;
        }
        map[d.uuid] = draft;
      }
      localStorage.setItem(storeKey, JSON.stringify(map));
    },
    [store, drafts, DAY_MS, HOUR_MS],
  );
}

export async function clearDrafts(page: Page, store: DraftStore): Promise<void> {
  await page.evaluate((key) => localStorage.removeItem(key as string), store);
}

export async function readDrafts(page: Page, store: DraftStore): Promise<Record<string, any> | null> {
  return await page.evaluate((key) => {
    const raw = localStorage.getItem(key as string);
    return raw ? JSON.parse(raw) : null;
  }, store);
}
