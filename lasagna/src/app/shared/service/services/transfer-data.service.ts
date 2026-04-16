import {inject, Injectable} from '@angular/core';
import {ReadWriteFileService} from './read-write-file.service';
import {DexieIndexDbService} from '../db/dexie-index-db.service';
import {Stores} from '../db/const/stores';
import {WINDOW} from '../tokens/window.token';
import {NotificationsService} from './notifications.service';
import {errorHandler} from '../../helpers';

export interface TransferDataStructure {
  store: Stores
  data: any[]
  version: number
  createdAt: number
}

@Injectable({
  providedIn: 'root'
})
export class TransferDataService {
  constructor(
    private _indexDbService: DexieIndexDbService,
    private _csvReaderService: ReadWriteFileService
  ) {
  }

  private readonly _window = inject(WINDOW);
  private readonly _notificationsService = inject(NotificationsService);
  private readonly _exportDTODependenciesMap: Partial<Record<Stores, Record<string, Stores>>> = {
    [Stores.RECIPES]: {
      tags: Stores.TAGS,
      category_id: Stores.RECIPES_CATEGORIES,
      'nth.ingredients.recipe_id': Stores.RECIPES,
      'nth.ingredients.product_id': Stores.PRODUCTS,
    },
    [Stores.PRODUCTS]: {
      category_id: Stores.PRODUCTS_CATEGORIES,
    },
  };

  get currentBackupDate() {
    try {
      const date = this._window?.localStorage.getItem('lastBackupDate');
      if (!date) return null;
      return new Date(Number(date));
    } catch (e) {
      this._notificationsService.error(errorHandler(e));
      return null;
    }
  }

  /**
   * Экспортирует данные из указанного стора вместе со всеми зависимостями, определенными в _exportDTODependenciesMap.
   * @param targetStore
   * @param options
   */
  async exportDataFor(
    targetStore: Stores,
    options: { selected?: string[] } = {},
  ) {
    // Кеш для уже загруженных данных, чтобы избежать повторных запросов при обходе зависимостей
    const cache = new Map<Stores, Map<string, any>>();

    // Получаем или создаем кеш для стора
    const getStoreCache = (store: Stores) => {
      if (!cache.has(store)) cache.set(store, new Map());
      return cache.get(store)!;
    };

    // Парсит ключ вида "nth.ingredients.product_id" и возвращает {arrayField: "ingredients", itemField: "product_id"}
    const parseNthKey = (key: string) => {
      const parts = key.replace('nth.', '').split('.');
      return {arrayField: parts[0], itemField: parts.slice(1).join('.')};
    };

    // Проверяет, есть ли в кеше элемент с данным id, если нет - загружает из БД и сохраняет в кеше
    const ensureCached = async (store: Stores, id: unknown): Promise<any> => {
      if (typeof id !== 'string') {
        throw new Error(`Dependencies in ${store} for ${targetStore} should be string. Key ${id} is not correct`);
      }
      const storeCache = getStoreCache(store);
      if (storeCache.has(id)) return undefined;
      const item = await this._indexDbService.getOne(store, id);
      if (!item) return undefined;
      storeCache.set(id, item);
      return item;
    };

    // Комбинирует проверку кеша и рекурсивный обход зависимостей для данного id
    const ensureCachedAndCollect = async (depStore: Stores, id: unknown) => {
      const found = await ensureCached(depStore, id);
      if (found && this._exportDTODependenciesMap[depStore]) {
        await collectDependencies(depStore, [id as string]);
      }
    };
    // Рекурсивно обходит зависимости и кеширует все связанные данные
    const collectDependencies = async (store: Stores, selectedIds?: string[]) => {
      const items = selectedIds?.length
        ? await this._indexDbService.getMany(store, selectedIds)
        : await this._indexDbService.getAll(store);

      // кешируем сами данные до обхода зависимостей,
      // чтобы не зациклиться при рекурсии (например, вложенные рецепты)
      const storeCache = getStoreCache(store);
      for (const item of items) {
        storeCache.set(item.uuid, item);
      }

      const depsMap = this._exportDTODependenciesMap[store];
      if (!depsMap) return;

      // Теперь проходим по каждому элементу и его зависимостям
      for (const item of items) {
        for (const [depKey, depStore] of Object.entries(depsMap)) {
          // Особый синтаксис для обозначения массивов объектов, где нужно пройтись по каждому элементу и взять id из его поля
          if (depKey.startsWith('nth.')) {
            const {arrayField, itemField} = parseNthKey(depKey);
            const array = item[arrayField];

            if (!Array.isArray(array)) {
              throw new Error(`Incorrect dependencies map for ${store}. Key "${depKey}" should point to an array`);
            }

            for (const element of array) {
              const id = element[itemField];
              if (!id) continue;
              await ensureCachedAndCollect(depStore, id);
            }
          } else {
            const value = item[depKey];
            const ids = Array.isArray(value) ? value : [value];

            for (const id of ids) {
              if (!id) continue;
              await ensureCachedAndCollect(depStore, id);
            }
          }
        }
      }
    };

    // Собственно, начинаем сбор данных с целевого стора
    await collectDependencies(targetStore, options.selected);

    // Формируем итоговую структуру для экспорта
    const version = await this._indexDbService.getVersion();
    const createdAt = Date.now();
    const writeObjects: TransferDataStructure[] = Array.from(cache.entries()).map(
      ([store, items]) => ({
        store,
        data: Array.from(items.values()),
        version,
        createdAt,
      })
    );

    // Сохраняем в файл (по формату JSON, так как с CSV будет сложнее из-за вложенных структур)
    this._csvReaderService.saveToJSONFile(
      writeObjects,
      this._getFileName(targetStore, 'json')
    );
  }

  async exportAll(
    beforeSavedCb?: () => void
  ) {
    const version = await this._indexDbService.getVersion();
    const createdAt = Date.now();
    const data: TransferDataStructure[] = [];
    const source = (Object.values(Stores) as Stores[]).filter((store) => store !== Stores.INDICES);
    for (const store of source) {
      const items = await this._indexDbService.getAll(store);
      data.push({
        store,
        data: items,
        version,
        createdAt,
      });
    }
    if (beforeSavedCb) {
      beforeSavedCb();
    }

    this._csvReaderService.saveToJSONFile(data, this._getFileName('backup' as any, 'json'));
  }

  async restoreAllData(
    files?: File[],
  ) {
    if (files?.length && files.length > 1) {
      throw new Error('Only one file is allowed');
    }

    const data = await this._csvReaderService.readFromJSONFile<TransferDataStructure[]>(files![0]);
    await this._indexDbService.restoreAllData(data);
    await this._indexDbService.flushCache();
  }

  makeCsv(
    data: any[],
  ) {
    return this._csvReaderService.makeCsv(data);
  }

  private _getFileName(
    source: string,
    fileType: 'csv' | 'json',
  ) {
    const date = new Date().toISOString();
    return `${source}_export_${date}.${fileType}`;
  }
}
