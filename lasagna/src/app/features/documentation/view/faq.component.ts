import {Component, computed, inject, OnInit, OnDestroy} from '@angular/core';
import {FaqService} from '../service/faq.service';
import {USER_LANGUAGE} from '../../../features/settings/service/providers/user-language.token';
import {SafeHtmlPipe} from '../../../shared/view/pipes/safehtml.pipe';
import {TranslatePipe} from '@ngx-translate/core';
import {TitleComponent} from '../../../shared/view/ui/layout/title/title.component';
import {OnboardingService} from '../../onboarding/onboarding.service';

@Component({
  selector: 'lg-faq',
  standalone: true,
  imports: [SafeHtmlPipe, SafeHtmlPipe, TranslatePipe, TitleComponent],
  template: `
    <lg-title>
      {{ 'faq.title' | translate }}
    </lg-title>

    @for (section of localizedFaqs(); track section.path) {
      <section class="faq-block">
        <h3>{{ section.title }}</h3>
        <div [innerHTML]="section.html | safeHtml"></div>
      </section>
    }
  `,
  styles: [`

  `]
})
export class FaqComponent implements OnInit, OnDestroy {
  private faqService = inject(FaqService);
  private lang = inject(USER_LANGUAGE);
  private _onboarding = inject(OnboardingService);

  localizedFaqs = computed(() =>
    this.faqService.getFaqsView().filter(section => section.language === this.lang())
  );

  ngOnInit() {
    // Начинаем отслеживание времени при отображении FAQ компонента
    this._onboarding.startFaqTimeTracking();
  }

  ngOnDestroy() {
    // Останавливаем отслеживание времени при уничтожении FAQ компонента
    this._onboarding.stopFaqTimeTracking();
  }
}
