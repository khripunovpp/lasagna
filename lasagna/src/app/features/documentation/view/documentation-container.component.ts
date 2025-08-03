import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {DocsThreeComponent} from './docs-three.component';
import {FaqComponent} from './faq.component';
import {ContainerComponent} from '../../../shared/view/ui/layout/container/container.component';


@Component({
  selector: 'lg-documentation-container',
  template: `
    <lg-container [compact]="true">
      <lg-docs-three></lg-docs-three>

      <lg-faq></lg-faq>

      <div class="lg-documentation-container__content">
        <router-outlet></router-outlet>
      </div>
    </lg-container>
  `,
  host: {
    class: 'lg-documentation-container',
  },
  styles: [`
    .lg-documentation-container__content {
      margin-top: 32px;

      @media (max-width: 768px) {
        margin-top: 8px;
      }
    }
  `],
  imports: [
    RouterOutlet,
    ContainerComponent,
    DocsThreeComponent,
    FaqComponent,
  ],
})
export class DocumentationContainerComponent {

}
