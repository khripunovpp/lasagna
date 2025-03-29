import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[lgCardListItem]',
  standalone: true,
})
export class CardListItemDirective {
  constructor(
    public template: TemplateRef<any>
  ) {
    console.log(template)
  }
}
