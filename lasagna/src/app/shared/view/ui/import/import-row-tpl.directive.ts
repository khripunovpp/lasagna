import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[lgImportRowTpl]',
  standalone: true,
})
export class ImportRowTplDirective {
  constructor(
    public templateRef: TemplateRef<any>,
  ) {

  }
}
