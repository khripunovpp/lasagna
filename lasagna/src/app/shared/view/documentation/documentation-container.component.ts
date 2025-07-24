import {Component} from '@angular/core';
import {DocsService} from '../../service/services/docs.service';

import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {ContainerComponent} from '../ui/layout/container/container.component';
import {DocsThreeComponent} from './docs-three.component';


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

      @media (max-width: 768px) {
        margin-top: 8px;
      }
    }
  `],
  imports: [
    RouterOutlet,
    ContainerComponent,
    DocsThreeComponent,
    ],
})
export class DocumentationContainerComponent {

}
