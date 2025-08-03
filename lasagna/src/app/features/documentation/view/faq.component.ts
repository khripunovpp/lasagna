import {Component, computed, inject} from '@angular/core';
import {FaqService} from '../service/faq.service';
import {USER_LANGUAGE} from '../../../features/settings/service/providers/user-language.token';
import {SafeHtmlPipe} from '../../../shared/view/pipes/safehtml.pipe';
import {TranslatePipe} from '@ngx-translate/core';
import {SelfStartDirective} from '../../../shared/view/directives/self-start.directive';
import {TitleComponent} from '../../../shared/view/ui/layout/title/title.component';

@Component({
  selector: 'lg-faq',
  standalone: true,
  imports: [SafeHtmlPipe, SafeHtmlPipe, TranslatePipe, SelfStartDirective, TitleComponent],
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
export class FaqComponent {
  private faqService = inject(FaqService);
  private lang = inject(USER_LANGUAGE);

  localizedFaqs = computed(() =>
    this.faqService.getFaqsView().filter(section => section.language === this.lang())
  );
}
