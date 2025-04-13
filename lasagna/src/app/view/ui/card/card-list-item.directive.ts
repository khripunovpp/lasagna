import {Directive, input, TemplateRef} from '@angular/core';

@Directive({
  selector: '[lgCardListItem]',
  standalone: true,
})
export class CardListItemDirective {
  constructor(
    public template: TemplateRef<any>
  ) {
  }

  uuid = input<string>();
}
