import {Directive, Input, TemplateRef} from '@angular/core';

@Directive({
  selector: 'ng-template[lgTab]',
  standalone: true,
})
export class TabDirective {
  constructor(
    public templateRef: TemplateRef<unknown>
  ) {
  }

  @Input({required: true}) label!: string;
  @Input({required: true}) alias!: string;
}
