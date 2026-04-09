import {Injectable} from '@angular/core';
import {DexieIndexDbService} from '../../../../shared/service/db/dexie-index-db.service';
import {Stores} from '../../../../shared/service/db/const/stores';
import {RepositoryAbstract} from '../../../../shared/service/services/repository/repository.abstract';
import {CloudSyncService} from '../../../sync/service/cloud-sync.service';
import {Folder} from '../models/Folder';
import {FolderDTO} from '../schemes/Folder.scheme';

@Injectable({
  providedIn: 'root'
})
export class FoldersRepository extends RepositoryAbstract<FolderDTO, Folder> {
  constructor(
    indexDbService: DexieIndexDbService,
    cloudSyncService: CloudSyncService,
  ) {
    super(Stores.FOLDERS, indexDbService, cloudSyncService);
  }

  override factory = (dto: FolderDTO) => Folder.fromRaw(dto);

  override changeLogCondition = () => false;

  getChildren(parent_uuid: string | null, allFolders: Folder[]): Folder[] {
    return allFolders
      .filter(f => f.parent_uuid === parent_uuid)
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  // Returns chain [root...parent, current] for breadcrumbs
  getAncestors(uuid: string, allFolders: Folder[]): Folder[] {
    const map = new Map(allFolders.map(f => [f.uuid!, f]));
    const chain: Folder[] = [];
    let current = map.get(uuid);
    while (current) {
      chain.unshift(current);
      current = current.parent_uuid ? map.get(current.parent_uuid) : undefined;
    }
    return chain;
  }

  async countRecipes(folder_uuid: string | null): Promise<number> {
    return this.indexDbService.ref(Stores.RECIPES)
      .filter((r: any) => r.folder_uuid === folder_uuid && !r.deleted)
      .count();
  }

  // Returns { folders, recipes } counts for delete confirmation dialog
  async countDescendants(uuid: string): Promise<{ folders: number; recipes: number }> {
    const all = await this.getAll(true);
    const folderUuids = this._collectDescendantUuids(uuid, all);

    const recipeCount = await this.indexDbService.ref(Stores.RECIPES)
      .where('folder_uuid')
      .anyOf(Array.from(folderUuids))
      .and((r: any) => !r.deleted)
      .count();

    return {
      folders: folderUuids.size,
      recipes: recipeCount,
    };
  }

  async deleteRecursive(uuid: string): Promise<void> {
    const all = await this.getAll(true);
    const folderUuids = this._collectDescendantUuids(uuid, all);
    const folderUuidsArr = Array.from(folderUuids);

    const now = Date.now();

    // Soft-delete all collected folders
    const deletedFolderDtos = all
      .filter(f => folderUuids.has(f.uuid!))
      .map(f => ({
        ...f.toDTO(),
        deleted: 1,
        deletedAt: now,
        updatedAt: now,
        dirtyToSync: true,
      }));

    await this.indexDbService.replaceManyData(Stores.FOLDERS, deletedFolderDtos);

    // Soft-delete all recipes in those folders
    const recipes = await this.indexDbService.ref(Stores.RECIPES)
      .where('folder_uuid')
      .anyOf(folderUuidsArr)
      .and((r: any) => !r.deleted)
      .toArray();

    if (recipes.length > 0) {
      const deletedRecipeDtos = recipes.map((r: any) => ({
        ...r,
        deleted: 1,
        deletedAt: now,
        updatedAt: now,
        dirtyToSync: true,
      }));
      await this.indexDbService.replaceManyData(Stores.RECIPES, deletedRecipeDtos);
    }
  }

  async bulkMoveRecipes(recipeUuids: string[], targetFolderUuid: string | null): Promise<void> {
    const now = Date.now();
    await this.indexDbService.bulkPatch(
      Stores.RECIPES,
      recipeUuids.map(uuid => ({uuid, folder_uuid: targetFolderUuid, updatedAt: now})),
    );
  }

  async bulkMoveFolders(folderUuids: string[], targetParentUuid: string | null): Promise<void> {
    const now = Date.now();
    await this.indexDbService.bulkPatch(
      Stores.FOLDERS,
      folderUuids.map(uuid => ({uuid, parent_uuid: targetParentUuid, updatedAt: now})),
    );
  }

  // Target is valid if it is not a descendant of source (and not source itself)
  isValidMoveTarget(sourceUuid: string, targetUuid: string | null, allFolders: Folder[]): boolean {
    if (targetUuid === null) return true;
    if (targetUuid === sourceUuid) return false;

    const map = new Map(allFolders.map(f => [f.uuid!, f]));
    let current = map.get(targetUuid);
    while (current) {
      if (current.uuid === sourceUuid) return false;
      current = current.parent_uuid ? map.get(current.parent_uuid) : undefined;
    }
    return true;
  }

  private _collectDescendantUuids(rootUuid: string, allFolders: Folder[]): Set<string> {
    const result = new Set<string>();
    const queue = [rootUuid];
    while (queue.length) {
      const current = queue.shift()!;
      result.add(current);
      allFolders
        .filter(f => f.parent_uuid === current)
        .forEach(f => queue.push(f.uuid!));
    }
    return result;
  }
}
