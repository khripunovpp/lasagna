import {Directive, Input, TemplateRef} from '@angular/core';

@Directive({
  selector: 'ng-template[lgTab]',
})
export class TabDirective {
  constructor(
    public templateRef: TemplateRef<unknown>
  ) {
  }

  @Input({required: true}) label!: string;
  @Input({required: true}) alias!: string;
  @Input({required: false}) display: boolean = true;
}
