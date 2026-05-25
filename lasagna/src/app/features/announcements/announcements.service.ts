import {computed, effect, inject, Injectable, signal} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {marker as _} from '@colsen1991/ngx-translate-extract-marker';
import {filter, map, startWith} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';
import {WINDOW} from '../../shared/service/tokens/window.token';
import {IS_CLIENT} from '../../shared/service/tokens/isClient.token';
import {getURLWithoutParams} from '../../shared/helpers';
import {AnalyticsService} from '../../shared/service/services/analytics.service';
import {SupportService} from '../home/service/support.service';
import {TranslateService} from '@ngx-translate/core';

export interface AnnouncementDetailsLink {
  labelKey: string;
  url?: string;
  external?: boolean;
  actionFn?: () => void;
}

export interface AnnouncementConfig {
  id: string;
  titleKey: string;
  bodyKey: string;
  /** ISO date — banner not shown before this moment. Undefined = no lower bound. */
  startsAt?: string;
  /** ISO date — banner not shown at or after this moment. */
  expiresAt: string;
  detailsLink?: AnnouncementDetailsLink;
  /**
   * Route patterns this announcement is shown on. Undefined = every route.
   * Each entry matches the current URL (path only, no query) by:
   *  - exact equality, or
   *  - prefix match if it ends with '*' (e.g. '/recipes/*').
   */
  routeMatch?: string | string[];
}

const STORAGE_PREFIX = 'announcement-dismissed:';

@Injectable({providedIn: 'root'})
export class AnnouncementsService {
  private readonly _window = inject(WINDOW);
  private readonly _isClient = inject(IS_CLIENT);
  private readonly _router = inject(Router);
  private readonly _analytics = inject(AnalyticsService);
  private readonly _support = inject(SupportService);
  private readonly _translate = inject(TranslateService);

  private readonly _configs: AnnouncementConfig[] = [
    {
      id: 'feedback-home-2026-05',
      titleKey: _('announcements.feedback-home-2026-05.title'),
      bodyKey: _('announcements.feedback-home-2026-05.body'),
      startsAt: '2026-05-25',
      expiresAt: '2026-08-01',
      detailsLink: {
        labelKey: _('announcements.feedback-home-2026-05.cta'),
        actionFn: () => this._support.requestOpen({
          subject: this._translate.instant(_('announcements.feedback-home-2026-05.support-subject')),
          message: this._translate.instant(_('announcements.feedback-home-2026-05.support-message')),
        }),
      },
      routeMatch: ['/', '/home'],
    },
    {
      id: 'folders-mode-2026-05',
      titleKey: _('announcements.folders-mode-2026-05.title'),
      bodyKey: _('announcements.folders-mode-2026-05.body'),
      startsAt: '2026-05-24',
      expiresAt: '2026-07-01',
      detailsLink: {
        labelKey: _('announcements.banner.details'),
        url: '/documents/recipes/recipes-overview',
      },
      routeMatch: ['/recipes'],
    },
    {
      id: 'shrinkage-tracking-2026-04',
      titleKey: _('announcements.shrinkage-tracking-2026-04.title'),
      bodyKey: _('announcements.shrinkage-tracking-2026-04.body'),
      startsAt: '2026-04-25',
      expiresAt: '2026-07-01',
      detailsLink: {
        labelKey: _('announcements.banner.details'),
        url: '/documents/recipes/calculation',
      },
      routeMatch: ['/recipes/calculate/*'],
    },
    {
      id: 'product-price-history-2026-03',
      titleKey: _('announcements.product-price-history-2026-03.title'),
      bodyKey: _('announcements.product-price-history-2026-03.body'),
      startsAt: '2026-03-20',
      expiresAt: '2026-07-01',
      detailsLink: {
        labelKey: _('announcements.banner.details'),
        url: '/documents/storage/adding-and-editing',
      },
      routeMatch: ['/products'],
    },
    {
      id: 'recipe-quick-product-2026-03',
      titleKey: _('announcements.recipe-quick-product-2026-03.title'),
      bodyKey: _('announcements.recipe-quick-product-2026-03.body'),
      startsAt: '2026-03-20',
      expiresAt: '2026-07-01',
      detailsLink: {
        labelKey: _('announcements.banner.details'),
        url: '/documents/recipes/adding-recipes',
      },
      routeMatch: ['/recipes/add', '/recipes/edit/*'],
    },
  ];

  private readonly _shownTracked = new Set<string>();

  private readonly _dismissedTick = signal(0);

  private readonly _currentPath = toSignal(
    this._router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(e => getURLWithoutParams(e.urlAfterRedirects)),
      startWith(getURLWithoutParams(this._router.url)),
    ),
    {initialValue: getURLWithoutParams(this._router.url)},
  );

  readonly active = computed<AnnouncementConfig | null>(() => {
    if (!this._isClient) return null;
    this._dismissedTick();
    const now = Date.now();
    const path = this._currentPath();
    for (const cfg of this._configs) {
      if (cfg.startsAt && new Date(cfg.startsAt).getTime() > now) continue;
      if (new Date(cfg.expiresAt).getTime() <= now) continue;
      if (this._isDismissed(cfg.id)) continue;
      if (!this._matchesRoute(cfg.routeMatch, path)) continue;
      return cfg;
    }
    return null;
  });

  private readonly _trackShownEffect = effect(() => {
    const a = this.active();
    if (!a) return;
    if (this._shownTracked.has(a.id)) return;
    this._shownTracked.add(a.id);
    this._analytics.trackEvent('announcement_shown', {
      event_category: 'announcement',
      event_label: a.id,
      announcement_id: a.id,
    });
  });

  private _matchesRoute(pattern: string | string[] | undefined, path: string): boolean {
    if (!pattern) return true;
    const patterns = Array.isArray(pattern) ? pattern : [pattern];
    return patterns.some(p => {
      if (p.endsWith('*')) return path.startsWith(p.slice(0, -1));
      return path === p;
    });
  }

  dismiss(id: string): void {
    this._persistDismissal(id);
    this._analytics.trackEvent('announcement_dismissed', {
      event_category: 'announcement',
      event_label: id,
      announcement_id: id,
    });
  }

  private _persistDismissal(id: string): void {
    try {
      this._window?.localStorage.setItem(STORAGE_PREFIX + id, '1');
    } catch {
      // ignore
    }
    this._dismissedTick.update(v => v + 1);
  }

  trackDetailsClick(id: string): void {
    this._persistDismissal(id);
    this._analytics.trackEvent('announcement_details_clicked', {
      event_category: 'announcement',
      event_label: id,
      announcement_id: id,
    });
  }

  private _isDismissed(id: string): boolean {
    try {
      return this._window?.localStorage.getItem(STORAGE_PREFIX + id) === '1';
    } catch {
      return false;
    }
  }
}
