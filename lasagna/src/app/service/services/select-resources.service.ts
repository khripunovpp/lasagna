import {Injectable, Optional} from '@angular/core';
import {IndexDbSelectLoaderService} from './index-db-select-loader.service';
import {resources} from '../const/select-resources.configs';
import {Subject} from 'rxjs';

export interface SelectResourceLoader<T = unknown> {
  load(name: string): Promise<unknown>
}

export interface SelectResource<T = unknown> {
  name: string
  list: T[]
  lists?: Record<string, T[]>
  loader: SelectResourceLoader<T>
}

@Injectable()
export class SelectResourcesService {
  constructor(
    @Optional() private _indexDbSelectLoaderService: IndexDbSelectLoaderService
  ) {
  }

  private _registry = new Map<string, SelectResource>();
  private _registry$ = new Subject<Map<string, SelectResource>>()

  register<T>(name: string) {
    const cfg = resources[name];
    this._registry.set(cfg.name, {
      name: cfg.name,
      list: [],
      lists: {},
      loader: {
        load: () => {
          return this._indexDbSelectLoaderService.load(cfg.loaderConfig?.['storeName'] as string);
        }
      }
    });
  }

  get<T>(name: string): T {
    return this._registry.get(name) as T;
  }

  load<T>(
    resources?: string[]
  ) {
    const keys = resources || Array.from(this._registry.keys());

    return Promise.all(keys.map(async key => {
      const loader = this.get<SelectResource<T>>(key);
      const result = await loader.loader.load(loader.name);
      if (Array.isArray(result)) {
        loader.list = result;
      } else {
        loader.lists = result as Record<string, T[]>;
      }
    })).then(() => {
      return keys.reduce((acc, key) => {
        acc[key] = this.get(key);
        return acc;
      }, {} as Record<string, T[]>);
    }).then(() => {
      this._registry$.next(this._registry);
    });
  }

  subscribe(fn: (registry: Map<string, SelectResource>) => void) {
    return this._registry$.subscribe(fn);
  }
}
