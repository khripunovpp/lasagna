import {Directive, Input, TemplateRef} from '@angular/core';

@Directive({
  selector: '[lgSelectionListItem]',
  standalone: true,
})
export class SelectionListItemDirective {
  constructor(
    public template: TemplateRef<any>
  ) {
  }

  @Input() uuid: string | undefined | null = '';
  @Input() type: string = '';
  @Input() bgColor: string = '';
}
