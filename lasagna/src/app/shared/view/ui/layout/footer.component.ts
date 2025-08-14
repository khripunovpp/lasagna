import {Component, inject} from '@angular/core';
import {FadeInComponent} from '../fade-in.component';
import {TranslatePipe} from '@ngx-translate/core';
import {JsonPipe} from '@angular/common';
import {VersionService} from '../../../service/services/version.service';
import {environment} from '../../../../../environments/environment';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {map, switchMap, startWith, filter} from 'rxjs';


@Component({
  selector: 'lg-footer',
  standalone: true,
  template: `
    <lg-fade-in>
      <footer class="lg-footer">
        @if (canSeePolicies()) {
          <p class="footer-credit">
            👨‍💻 <span class="gradient-text">{{ 'footer.credit.developed' | translate }}</span>
            • 🪄&nbsp;<span class="gradient-text">{{ 'footer.credit.inspired' | translate }}</span>
          </p>

          {{ 'footer.agree' | translate }}
          <a [attr.href]="environment.policies.privacyPolicyUrl"
             target="_blank">{{ 'footer.privacy' | translate }}</a>,
          <a [attr.href]="environment.policies.termsOfServiceUrl"
             target="_blank">{{ 'footer.terms' | translate }}</a>,
          {{ 'footer.and' | translate }}
          <a [attr.href]="environment.policies.cookiePolicyUrl"
             target="_blank">{{ 'footer.cookie' | translate }}</a>.
        }
        <div class="lg-footer__version">v{{ appVersion() }}</div>
      </footer>
    </lg-fade-in>
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

    .lg-footer__version {
      margin-top: 0.5em;
      color: #888;
      opacity: 0.7;
    }

    .footer-credit {
      font-size: 14px;
      font-weight: 600;
      margin: 0;
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
    JsonPipe
  ]
})
export class FooterComponent {
  readonly environment = environment;
  private readonly versionService = inject(VersionService);
  readonly appVersion = this.versionService.version;
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  readonly debugData = toSignal(this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    startWith(null), // Для первоначальной загрузки
    switchMap(() => {
      // Функция для поиска данных в дереве маршрутов
      const findRouteData = (route: ActivatedRoute): any => {
        let currentRoute = route;

        // Идем по всему дереву маршрутов и собираем все данные
        while (currentRoute) {
          if (currentRoute.snapshot.data && Object.keys(currentRoute.snapshot.data).length > 0) {
            return currentRoute.snapshot.data;
          }

          // Переходим к дочернему маршруту
          if (currentRoute.firstChild) {
            currentRoute = currentRoute.firstChild;
          } else {
            break;
          }
        }

        return {};
      };

      const routeData = findRouteData(this.activatedRoute);
      return [routeData];
    })
  ));

  readonly canSeePolicies = toSignal(this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    startWith(null), // Для первоначальной загрузки
    switchMap(() => {
      // Функция для поиска данных в дереве маршрутов
      const findRouteData = (route: ActivatedRoute): any => {
        let currentRoute = route;

        // Идем по всему дереву маршрутов и собираем все данные
        while (currentRoute) {
          if (currentRoute.snapshot.data && Object.keys(currentRoute.snapshot.data).length > 0) {
            return currentRoute.snapshot.data;
          }

          // Переходим к дочернему маршруту
          if (currentRoute.firstChild) {
            currentRoute = currentRoute.firstChild;
          } else {
            break;
          }
        }

        return {};
      };

      const routeData = findRouteData(this.activatedRoute);
      return [routeData];
    }),
    map(data => data?.canSeePolicies || false)
  ));
}
