import {Component, effect, inject, OnInit, Signal} from '@angular/core';
import {Router, RouterOutlet, Scroll} from '@angular/router';
import {PwaInstallComponent} from './features/home/view/pwa-install.component';
import {GlobalSearchComponent} from './features/global-search/global-search.component';
import {LastBackupInformerComponent} from './features/home/view/last-backup-informer.component';
import {TranslateModule} from '@ngx-translate/core';
import {FontTesterComponent} from './features/home/view/font-tester.component';
import {DemoService} from './shared/service/services/demo.service';
import {FooterComponent} from './shared/view/layout/footer.component';
import {HeaderComponent} from './shared/view/layout/header.component';
import {OverlayActionsComponent} from './shared/view/ui/overlay-actions/overlay-actions.component';
import {StorageQuotaWarningComponent} from './features/home/view/storage-quota-warning.component';
import {SatisfactionPopupComponent} from './features/home/view/satisfaction-popup.component';
import {DecimalPipe, ViewportScroller} from '@angular/common';
import {isPwa} from './shared/helpers/match-media.helper';
import {filter, map} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    PwaInstallComponent,
    GlobalSearchComponent,
    LastBackupInformerComponent,
    TranslateModule,
    FontTesterComponent,
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
        map((event: Scroll) => event.position || [0, 0]),
      ),
    );
  }

  readonly scrollingPosition: Signal<[number, number] | undefined>;
  readonly scrollToPositionEffect = effect(() => {
    if (this.scrollingPosition()) {
      this._viewportScroller.scrollToPosition(this.scrollingPosition()!);
    }
  });
  readonly isPwa = isPwa;
  private readonly demoService = inject(DemoService);

  async ngOnInit() {
    await this.demoService.loadDemoData();
  }
}
