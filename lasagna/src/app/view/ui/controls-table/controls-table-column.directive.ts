import {Directive, ElementRef, HostBinding, Input} from '@angular/core';

@Directive({
  selector: '[lgControlsTableColumn]',
  standalone: true
})
export class ControlsTableColumnDirective {
  constructor(public el: ElementRef<HTMLElement>) {
  }

  // Можешь добавить опционально индекс или ключ
  @Input() columnKey?: string;
  // в процентах
  @Input() width?: number;
  @Input() label?: string;
  @Input() align?: 'start' | 'center' | 'end' = 'start';

  @HostBinding('style.flex-basis.%') get widthPx(): number {
    return this.width ?? 0;
  }

  @HostBinding('style.flex') get flex(): string {
    return `1 0 ${this.width ?? 0}%`;
  }
  @HostBinding('style.display') display = 'flex';

  @HostBinding('style.justify-content') get justifyContent(): string {
    return this.align === 'start' ? 'flex-start' : this.align === 'center' ? 'center' : 'flex-end';
  }

  getText(): string {
    return this.el.nativeElement.textContent?.trim() ?? '';
  }

  // Можно расширить методами для стилей, размеров и т.п.
}
