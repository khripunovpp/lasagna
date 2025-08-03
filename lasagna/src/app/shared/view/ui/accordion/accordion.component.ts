import { Component, input } from '@angular/core';

@Component({
  selector: 'app-accordion',
  template: `
    <details class="accordion">
      <summary>{{ title() }}</summary>
      <div class="accordion-body">
        {{ content() }}
      </div>
    </details>
  `,
  styles: [`
    .accordion {
      border: 1px solid #ccc;
      border-radius: 6px;
      overflow: hidden;
      transition: border-color 0.3s ease;
    }

    summary {
      padding: 1rem;
      cursor: pointer;
      font-weight: 600;
      position: relative;
      list-style: none;
    }

    summary::marker {
      display: none;
    }

    summary::after {
      content: '⌄';
      position: absolute;
      right: 1rem;
      transition: transform 0.3s ease;
    }

    details[open] summary::after {
      transform: rotate(180deg);
    }

    .accordion-body {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.4s ease, padding 0.3s ease;
      padding: 0 1rem;
    }

    details[open] .accordion-body {
      padding: 1rem;
      max-height: 300px;
    }
  `]
})
export class AccordionComponent {
  title = input<string>('');
  content = input<string>('');
}
