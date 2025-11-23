import {Component, effect, inject, OnInit, Signal} from '@angular/core';
import {Router, RouterOutlet, Scroll} from '@angular/router';
import {PwaInstallComponent} from './features/home/view/pwa-install.component';
import {GlobalSearchComponent} from './features/global-search/global-search.component';
import {LastBackupInformerComponent} from './features/home/view/last-backup-informer.component';
import {TranslateModule} from '@ngx-translate/core';
import {DemoService} from './shared/service/services/demo.service';
import {FooterComponent} from './shared/view/layout/footer.component';
import {HeaderComponent} from './shared/view/layout/header.component';
import {OverlayActionsComponent} from './shared/view/ui/overlay-actions/overlay-actions.component';
import {StorageQuotaWarningComponent} from './features/home/view/storage-quota-warning.component';
import {SatisfactionPopupComponent} from './features/home/view/satisfaction-popup.component';
import {DecimalPipe, ViewportScroller} from '@angular/common';
import {IS_PWA} from './shared/helpers/match-media.helper';
import {filter, map, pairwise} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';
import {getURLWithoutParams} from './shared/helpers';
import {IS_CLIENT} from './shared/service/tokens/isClient.token';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    PwaInstallComponent,
    GlobalSearchComponent,
    LastBackupInformerComponent,
    TranslateModule,
    FooterComponent,
    OverlayActionsComponent,
    StorageQuotaWarningComponent,
    SatisfactionPopupComponent,
  ],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss',
  providers: [
    DecimalPipe
  ]
})
export class AppComponent
  implements OnInit {
  constructor(
    private _viewportScroller: ViewportScroller,
    private _router: Router,
  ) {
    this.scrollingPosition = toSignal(
      this._router.events.pipe(
        filter((event): event is Scroll => event instanceof Scroll),
        pairwise(),
        map((events: [Scroll, Scroll]) => {
          const diff = getURLWithoutParams(events[0].routerEvent.url) !== getURLWithoutParams(events[1].routerEvent.url);
          if (diff) {
            return [0, 0];
          }
          return events[1].position ?? this._viewportScroller.getScrollPosition()
        }),
      ),
    );
  }

  readonly scrollingPosition: Signal<[number, number] | undefined | null>;
  readonly scrollToPositionEffect = effect(() => {
    if (this.scrollingPosition()) {
      this._viewportScroller.scrollToPosition(this.scrollingPosition()!);
    }
  });
  readonly isPwa = inject(IS_PWA);
  private readonly demoService = inject(DemoService);
  readonly isBrowser = inject(IS_CLIENT);
  async ngOnInit() {
    if (!this.isBrowser) {
      return;
    }
    await this.demoService.loadDemoData();
  }
}
