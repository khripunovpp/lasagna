import {Component} from '@angular/core';
import {FadeInComponent} from '../fade-in.component';
import {TranslatePipe} from '@ngx-translate/core';

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

  `],
  imports: [
    FadeInComponent,
    TranslatePipe
  ]
})
export class FooterComponent {
  constructor() {

  }

}
