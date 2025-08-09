import {Component, inject} from '@angular/core';
import {FadeInComponent} from '../fade-in.component';
import {TranslatePipe} from '@ngx-translate/core';
import {APP_VERSION} from '../../../service/tokens/app-version.token';

@Component({
  selector: 'lg-footer',
  standalone: true,
  template: `
    <lg-fade-in>
      <footer class="lg-footer">
        {{ 'footer.agree' | translate }}
        <a href="https://github.com/khripunovpp/lasagna/blob/master/privacy-policy.md" target="_blank">{{ 'footer.privacy' | translate }}</a>,
        <a href="https://github.com/khripunovpp/lasagna/blob/master/terms-of-service.md" target="_blank">{{ 'footer.terms' | translate }}</a>,
        {{ 'footer.and' | translate }}
        <a href="https://github.com/khripunovpp/lasagna/blob/master/cookie-policy.md" target="_blank">{{ 'footer.cookie' | translate }}</a>.
        <div class="lg-footer__version">v{{ appVersion }}</div>
      </footer>
    </lg-fade-in>
  `,
  styles: [`
    .lg-footer {
      text-align: center;
      font-size: 0.9rem;
      color: #555;
      padding: 1em;
      line-height: 1.6;
      padding-top: 100px;
      padding-bottom: calc(var(--controls-bar-space, 0px) + 1em);
    }

    .lg-footer__version {
      margin-top: 0.5em;
      font-size: 0.8rem;
      color: #888;
      opacity: 0.7;
    }
  `],
  imports: [
    FadeInComponent,
    TranslatePipe
  ]
})
export class FooterComponent {
  appVersion = inject(APP_VERSION);
}
