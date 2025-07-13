import {Component} from '@angular/core';
import {DocsService} from '../../service/services/docs.service';
import {AsyncPipe, NgTemplateOutlet} from '@angular/common';
import {ActivatedRoute, RouterLink, RouterOutlet} from '@angular/router';
import {ContainerComponent} from '../ui/layout/container/container.component';
import {DocsThreeComponent} from './docs-three.component';
import {FlexColumnComponent} from '../ui/layout/flex-column.component';

@Component({
  selector: 'lg-documentation-container',
  template: `
    <lg-container [compact]="true">
      <lg-docs-three></lg-docs-three>

      <div class="lg-documentation-container__content">
        <router-outlet></router-outlet>
      </div>
    </lg-container>
  `,
  host:{
    class: 'lg-documentation-container',
  },
  styles:[`
    .lg-documentation-container__content {
      margin-top: 32px;

      @media (max-width: 600px) {
        margin-top: 8px;
      }
    }
  `],
  imports: [
    AsyncPipe,
    RouterLink,
    NgTemplateOutlet,
    RouterOutlet,
    ContainerComponent,
    DocsThreeComponent,
    FlexColumnComponent
  ],
})
export class DocumentationContainerComponent {

}
