import {Component, contentChildren, Directive, TemplateRef} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';
import {generateUuid} from '../../helpers/attribute.helper';

@Directive({
  selector: '[lgInlineSeparatedGroup]',
  standalone: true
})
export class InlineSeparatedGroupDirective {
  constructor(
    public templateRef: TemplateRef<any>,
  ) {
  }

  uuid = generateUuid()
}

@Component({
  selector: 'lg-inline-separated-group',
  standalone: true,
  template: `
    <div class="inline-separated-group">
      @for (item of items(); track item?.uuid; let i = $index, last = $last) {
        <ng-container [ngTemplateOutlet]="item.templateRef"></ng-container>
        @if (!last) {
          <span class="inline-separated-group__separator"> | </span>
        }
      }
    </div>
  `,
  imports: [
    NgTemplateOutlet
  ],
  styles: [
    `
      .inline-separated-group {
        display: flex;
        gap: 8px;
        align-items: center;
        white-space: nowrap;
        flex-wrap: wrap;
      }

      .inline-separated-group__separator {
        color: var(--color-text);
        font-size: 12px;
        font-weight: 500;
        opacity: 0.5;
      }
    `
  ]
})
export class InlineSeparatedGroupComponent {
  constructor() {
  }

  items = contentChildren(InlineSeparatedGroupDirective)
}
