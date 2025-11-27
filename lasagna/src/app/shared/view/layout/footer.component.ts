import {Component, computed, inject, viewChild} from '@angular/core';
import {FadeInComponent} from '../ui/fade-in.component';
import {TranslatePipe} from '@ngx-translate/core';

import {VersionService} from '../../service/services/version.service';
import {environment} from '../../../../environments/environment';
import {ActivatedRoute, Router, NavigationEnd, RouterLink} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {map, switchMap, startWith, filter} from 'rxjs';
import {SupportPopupComponent} from '../../../features/home/view/support-popup.component';
import {findRouteData} from '../../helpers';


@Component({
  selector: 'lg-footer',
  standalone: true,
  template: `
    <lg-fade-in>
      <footer class="lg-footer">
        @if (canSeeAuthors()) {
          <p class="footer-credit">
            <span>👨‍💻&nbsp;<span class="gradient-text">{{ 'footer.credit.developed' | translate }}</span></span>
            <span>🪄&nbsp;<span class="gradient-text">{{ 'footer.credit.inspired' | translate }}</span></span>
          </p>
        }
        @if (canSeePolicies()) {
          {{ 'footer.agree' | translate }}
          <a [attr.href]="environment.policies.privacyPolicyUrl"
             data-u2e="nav.footer.privacy-link"
             target="_blank">{{ 'footer.privacy' | translate }}</a>,
          <a [attr.href]="environment.policies.termsOfServiceUrl"
             data-u2e="nav.footer.terms-link"
             target="_blank">{{ 'footer.terms' | translate }}</a>,
          {{ 'footer.and' | translate }}
          <a [attr.href]="environment.policies.cookiePolicyUrl"
             data-u2e="nav.footer.cookie-policy-link"
             target="_blank">{{ 'footer.cookie' | translate }}</a>.
        }
        <div class="lg-footer__bottom">
          <button (click)="openSupport()"
                  class="lg-footer__support-link"
                  data-u2e="nav.footer.support-link"
                  type="button">
            {{ 'footer.support' | translate }}
          </button>
          <div class="lg-footer__version">
            v{{ appVersion() }}

            <a data-u2e="nav.footer.documents-link"
               routerLink="./documents"
               target="_blank">beta</a>.
          </div>
        </div>
      </footer>
    </lg-fade-in>

    @defer {
      <lg-support-popup #supportPopup></lg-support-popup>
    }
  `,
  styles: [`
    .lg-footer {
      text-align: center;
      font-size: 12px;
      color: #555;
      padding: 1em;
      line-height: 1.6;
      padding-top: 100px;
    }

    .lg-footer__bottom {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      margin-top: 0.5em;
    }

    .lg-footer__version {
      color: #888;
      opacity: 0.7;
    }

    .lg-footer__support-link {
      background: none;
      border: none;
      color: #888;
      font-family: inherit;
      font-size: inherit;
      cursor: pointer;
      text-decoration: underline;
      opacity: 0.7;
      transition: opacity 0.2s ease;
    }

    .lg-footer__support-link:hover {
      opacity: 1;
    }

    .footer-credit {
      font-size: 14px;
      font-weight: 600;
      margin: 0;
      display: flex;
      gap: 8px;
      align-items: center;
      justify-content: center;

      & > *:first-child::after {
        content: "•";
        margin-left: 8px;
      }

      @media (max-width: 600px) {
        flex-direction: column;
        gap: 0;

        & > *:first-child::after {
          display: none;
        }
      }
    }

    .gradient-text {
      background: linear-gradient(90deg, #9C27B0, #E91E63);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  `],
  imports: [
    FadeInComponent,
    TranslatePipe,
    SupportPopupComponent,
    RouterLink
  ]
})
export class FooterComponent {
  readonly environment = environment;
  private readonly versionService = inject(VersionService);
  readonly appVersion = this.versionService.version;
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  readonly supportPopup = viewChild(SupportPopupComponent);

  readonly routeData = toSignal(this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    startWith(null), // Для первоначальной загрузки
    switchMap(() => {
      const routeData = findRouteData(this.activatedRoute);
      return [routeData];
    })
  ));

  readonly canSeePolicies = computed(() => this.routeData()?.['canSeePolicies'] ?? false);
  readonly canSeeAuthors = computed(() => this.routeData()?.['canSeeAuthors'] ?? false);

  /**
   * Open support popup
   */
  openSupport(): void {
    this.supportPopup()?.open();
  }
}

