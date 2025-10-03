import {SyncStrategy} from './sync-strategy';
import {Recipe} from '../../../../features/recipes/service/models/Recipe';
import {RecipesRepository} from '../../repositories';

export class RecipeSyncStrategy
  implements SyncStrategy {
  constructor(
    private repo: RecipesRepository,
  ) {
  }

  async prepareSyncData(): Promise<any[]> {
    const recipes = await this.repo.getRecipes();

    return recipes.filter((r: any) => r.dirtyToSync)
      .map(r => r.toDTO());
  }

  async markAllAsSynced(items: any[]): Promise<void> {
    for (const recipe of items) {
      await this.repo.editRecipe(recipe.uuid, Recipe.fromRaw({
        ...recipe,
        dirtyToSync: false,
        syncedAt: Date.now()
      }));
    }
  }

  async syncFromCloud(serverData: any[], localData: any[]) {
    const localUuids = new Set((localData || []).map((item: any) => item.uuid));
    const newItems = (serverData || []).filter((item: any) => !localUuids.has(item.uuid));
    // await this.repo.addMany(newItems.map(item => Recipe.fromRaw(item)));
  }

  async getSyncStatus(): Promise<{ total: number; synced: number; dirty: number; lastSync: number | null }> {
    const recipes = await this.repo.getRecipes();
    return {
      total: recipes.length,
      synced: recipes.filter((r: any) => !r.dirtyToSync).length,
      dirty: recipes.filter((r: any) => r.dirtyToSync).length,
      lastSync: recipes.length > 0 ? Math.max(...recipes.map((r: any) => r.syncedAt ? new Date(r.syncedAt).getTime() : 0)) : null
    };
  }
}
