import {Component} from '@angular/core';

@Component({
  selector: 'lg-article-template',
  template: `
    <div class="lg-article-template">
      <ng-content></ng-content>
    </div>
  `,
  standalone: true,
})
export class ArticleTemplateComponent {
  constructor() {
  }
}
