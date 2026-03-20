import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {DocsThreeComponent} from './docs-three.component';
import {FaqComponent} from './faq.component';
import {ContainerComponent} from '../../../shared/view/layout/container.component';
import {TranslatePipe} from '@ngx-translate/core';
import {TitleComponent} from '../../../shared/view/layout/title.component';


@Component({
  selector: 'lg-documentation-container',
  template: `
    <lg-container [compact]="true">
      @defer {
        <lg-docs-three></lg-docs-three>
        <div class="lg-documentation-container__content">
          <router-outlet></router-outlet>
        </div>
        <lg-faq></lg-faq>
      } @error {
        {{ 'documents.defer-load-error' | translate }}
      }
    </lg-container>
  `,
  host: {
    class: 'lg-documentation-container',
  },
  styles: [`
    .lg-documentation-container__content {

    }
  `],
  imports: [
    RouterOutlet,
    ContainerComponent,
    DocsThreeComponent,
    FaqComponent,
    TranslatePipe,
    RouterLink,
    TitleComponent,
  ],
})
export class DocumentationContainerComponent {

}
