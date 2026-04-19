import {Injectable, signal} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {filter, map} from "rxjs/operators";

export interface LoaderContent {
  title?: string
  text?: string
}

/**
 * Сервис для управления состояниями лоадеров по их скоупам.
 *
 * По-умолчанию, если не передан скоуп, используется '*',
 * соответсвенно директивы LoaderDirective в которых не указан скоуп, будут слушать этот скоуп.
 */
@Injectable({
  providedIn: 'root'
})
export class LoadersManagerService {
  readonly contentMap = signal<Record<string, LoaderContent>>({});
  private readonly _loaders: Map<string, boolean> = new Map();
  private readonly _loadersStream = new BehaviorSubject<Record<string, boolean>>({});

  /**
   * Устанавливает состояние лоадера(ов) в видимое. Если не передан параметр, то устанавливает для лоадера с именем '*'.
   * @param loaderScopes
   * @param content - объект с полями title и text для отображения в лоадере
   */
  showLoader(
    loaderScopes: string | string[] = '*',
    content?: LoaderContent,
  ): void {
    this._withIds(loaderScopes, id => {
      this._loaders.set(id, true);
      if (content) {
        this.contentMap.update(map => {
          map[id] = content;
          return Object.assign({}, map);
        });
      }
    });
    this._emitChange(loaderScopes);
  }

  /**
   * Устанавливает состояние лоадера(ов) в скрытое. Если не передан параметр, то устанавливает для лоадера с именем '*'.
   * @param loaderScopes
   */
  hideLoader(
    loaderScopes: string | string[] = '*',
  ): void {
    this._withIds(loaderScopes, id => this._loaders.set(id, false));
    this._emitChange(loaderScopes);
  }

  /**
   * Проверяет видимость лоадера по его идентификатору.
   * @param loaderScope
   */
  isLoaderVisible(
    loaderScope: string,
  ): boolean {
    return this._loaders.has(loaderScope);
  }

  /**
   * Наблюдает за состоянием лоадера(ов) переданного скоупа
   * @param loaderScopes
   */
  observeScope(
    loaderScopes: string = '*',
  ) {
    return this._loadersStream.asObservable()
      .pipe(
        filter(loaders => loaders[loaderScopes] != null),
        map(loaders => loaders[loaderScopes]),
      );
  }

  private _withIds(
    ids: string | string[],
    callback: (id: string) => void,
  ) {
    return (Array.isArray(ids) ? ids : [ids])
      .forEach(id => callback(id));
  }

  private _emitChange(
    loaderScopes: string | string[],
  ) {
    const ids = Array.isArray(loaderScopes)
      ? loaderScopes
      : [loaderScopes];

    const currentLoaders: Record<string, boolean> = ids.reduce((acc, id) => {
      acc[id] = this._loaders.get(id) || false;
      return acc;
    }, {} as Record<string, boolean>);

    this._loadersStream.next(currentLoaders);
  }
}
