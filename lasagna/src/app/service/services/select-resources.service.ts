import {Injectable, Optional} from '@angular/core';
import {IndexDbSelectLoaderService} from './index-db-select-loader.service';
import {
  IndexDbSelectLoaderConfig,
  LocalstorageSelectLoaderConfig,
  resources,
  SelectResourcesConfig
} from '../const/select-resources.configs';
import {BehaviorSubject, Observable} from 'rxjs';
import {LocalstorageSelectLoaderService} from './localstorage-select-loader.service';

export interface SelectResourceLoader<T = unknown> {
  load(name: string): Promise<T[]>

  search(
    key: string,
    token: string
  ): Promise<T[]>

  uniqueKeys(
    storeName: string,
    field: string
  ): Promise<T[]>
}

export interface SelectResource<T = unknown> {
  name: string
  list: T[]
  lists?: Record<string, T[]>
  loader: SelectResourceLoader<T>
  stream?: Observable<T[]>
  cfg: SelectResourcesConfig
  updatedAt?: number
}

@Injectable({
  providedIn: 'root'
})
export class SelectResourcesService {
  constructor(
    @Optional() private _indexDbSelectLoaderService: IndexDbSelectLoaderService,
    @Optional() private _localstorageSelectLoaderService: LocalstorageSelectLoaderService,
  ) {
  }

  _registry = new Map<string, SelectResource>();
  private _registry$ = new BehaviorSubject<Map<string, SelectResource>>(new Map());

  get registryStream() {
    return this._registry$;
  }

  register<T>(name: string) {
    if (this._registry.has(name)) return;
    const cfg = resources[name];
    if (!cfg) {
      throw new Error(`SelectResource ${name} not found`);
      return;
    }
    const stream = new BehaviorSubject([] as T[]);
    this._registry.set(cfg.name, {
      cfg,
      name: cfg.name,
      list: [],
      lists: {},
      loader: {
        load: async () => {
          if (cfg.loaderConfig?.name === 'localStorage') {
            return this._localstorageSelectLoaderService.load((cfg.loaderConfig as LocalstorageSelectLoaderConfig)?.['key']!);
          }
          const indexDbCfg = cfg.loaderConfig as IndexDbSelectLoaderConfig;
          return this._indexDbSelectLoaderService.load(indexDbCfg?.['storeName']!)
        },
        search: async (
          key: string,
          token: string
        ) => {
          const indexDbCfg = cfg.loaderConfig as IndexDbSelectLoaderConfig;

          return this._indexDbSelectLoaderService.search(indexDbCfg?.['storeName']!, key, token).then(result => {
            stream.next(result as T[]);
            return result;
          });
        },

        uniqueKeys: async (
          storeName: string,
          field: string
        ) => {
          return this._indexDbSelectLoaderService.uniqueKeys(storeName as any, field).then(result => {
            const res = result.filter(Boolean);
            stream.next(res as T[]);
            return res;
          })
        }
      },
      stream: stream.asObservable(),
    });
  }

  get<T>(name: string): T {
    return this._registry.get(name) as T;
  }

  autocomplete<T>(
    name: string,
    key: string,
    term: string
  ) {
    const resource = this._registry.get(name);
    if (!resource) {
      throw new Error(`SelectResource ${name} not found`);
    }
    return resource.loader.search(key, term).then(result => {
      this._registry$.next(this._registry);
      return result;
    })
  }

  load<T>(
    resources?: string[],
    force = false
  ) {
    const keys = resources || Array.from(this._registry.keys());

    return Promise.all(keys.map(async key => {
      const cfg = this.get<SelectResource<T>>(key);
      // const cacheLifetime = 1000 * 60 * 5; // 5 minutes
      // if (cfg.updatedAt && Date.now() - cfg.updatedAt < cacheLifetime && !force) {
      //   return;
      // }
      let result: any;
      const loaderCfg = cfg.cfg.loaderConfig as IndexDbSelectLoaderConfig;
      if (loaderCfg?.selectUniqueKey?.length) {
        result = await cfg.loader.uniqueKeys(loaderCfg.storeName, loaderCfg.selectUniqueKey);
      } else {
        result = await cfg.loader.load(cfg.name)
      }

      if (Array.isArray(result)) {
        cfg.list = result;
      } else {
        cfg.lists = result as Record<string, T[]>;
      }
      cfg.updatedAt = Date.now();
    })).then(() => {
      return keys.reduce((acc, key) => {
        acc[key] = this.get(key);
        return acc;
      }, {} as Record<string, T[]>);
    }).then(() => {
      console.log('SelectResourcesService loaded', this._registry);
      this._registry$.next(this._registry);
    });
  }

  subscribe(fn: (registry: Map<string, SelectResource>) => void) {
    return this._registry$.subscribe(fn);
  }
}
