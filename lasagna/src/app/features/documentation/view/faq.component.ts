import {Component, computed, inject} from '@angular/core';
import {FaqService} from '../service/faq.service';
import {USER_LANGUAGE} from '../../../features/settings/service/providers/user-language.token';
import {SafeHtmlPipe} from '../../../shared/view/pipes/safehtml.pipe';

@Component({
  selector: 'lg-faq',
  standalone: true,
  imports: [SafeHtmlPipe, SafeHtmlPipe],
  template: `
    <section class="faq-section">
      <h2>Часто задаваемые вопросы</h2>

      @for (section of localizedFaqs(); track section.path) {
        <section class="faq-block">
          <h3>{{ section.title }}</h3>
          <div [innerHTML]="section.html | safeHtml"></div>
        </section>
      }
    </section>
  `,
  styles: [`
    .faq-section {
      max-width: 800px;
      margin: auto;
      padding: 2rem;
    }

    h2 {
      text-align: center;
      margin-bottom: 2rem;
      font-size: 2rem;
    }

    .faq-block {
      margin-bottom: 2rem;
    }

    h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
  `]
})
export class FaqComponent {
  private faqService = inject(FaqService);
  private lang = inject(USER_LANGUAGE);

  localizedFaqs = computed(() =>
    this.faqService.getFaqsView().filter(section => section.language === this.lang())
  );
}
