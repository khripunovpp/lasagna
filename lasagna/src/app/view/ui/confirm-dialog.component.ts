import { HelipopperService, HelipopperDirective } from '@ngneat/helipopper';
import {Component} from '@angular/core';

@Component({
  selector: '[confirm]',
  template: `
    <ng-template>
      <div>
        Are you sure you want to delete this {{ entity }}?
        <button (click)="close()">No</button>
        <button (click)="confirmAction()">Yes</button>
      </div>
    </ng-template>
    <ng-content></ng-content>
  `,
})
export class ConfirmComponent {
  @Input() entity = '';
  @ViewChild(TemplateRef) tpl: TemplateRef<any>;
  @Output() confirm = new EventEmitter();

  private popper: HelipopperDirective;

  constructor(private service: HelipopperService,
              private host: ElementRef) {}

  @HostListener('click')
  open() {
    if (this.popper) return;

    this.popper = this.service.open(this.host, this.tpl, {
      variation: 'popper',
      allowClose: false,
    });
  }

  confirmAction() {
    this.close();
    this.confirm.emit();
  }

  close() {
    this.popper.destroy();
    this.popper = null;
  }
}
