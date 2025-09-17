import { Component, TemplateRef, input } from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';

@Component({
  selector: 'lg-popover',
  template: `
    <div class="lg-popover">
      @if (contentTemplate()) {
        <ng-container [ngTemplateOutlet]="contentTemplate()"></ng-container>
      } @else {
        {{ text() }}
      }
    </div>
  `,
  imports: [
    NgTemplateOutlet
  ],
  styles: [`
    .lg-popover {
      background: #333;
      color: #fff;
      padding: 6px 10px;
      border-radius: 4px;
      font-size: 13px;
      max-width: 250px;
      word-wrap: break-word;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      z-index: 1000;
    }
  `]
})
export class PopoverComponent {
  text = input<string>('');                        // строковый вариант
  contentTemplate = input<TemplateRef<unknown> | null>(null); // кастомный шаблон
}
