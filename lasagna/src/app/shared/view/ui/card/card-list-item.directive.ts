import {Directive, Input, TemplateRef} from '@angular/core';

@Directive({
  selector: '[lgCardListItem]',
  standalone: true,
})
export class CardListItemDirective {
  constructor(
    public template: TemplateRef<any>
  ) {
  }

  @Input() uuid: string | undefined | null = '';
  @Input() type: string = '';
  @Input() bgColor: string = '';
}
