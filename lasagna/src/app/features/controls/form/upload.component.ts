import {Component, ElementRef, input, output, viewChild} from '@angular/core';

@Component({
  selector: 'lg-upload',
  standalone: true,
  template: `
    <div (click)="input.click()" class="lg-upload">
      <input #input
             (change)="onFileChange($event)"
             [accept]="accept()"
             [attr.data-u2e]="'upload.' + name()"
             [name]="name()"
             type="file">
      <div class="lg-upload__content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [
    `
      input {
        display: none;
      }
    `
  ]
})
export class UploadComponent {
  filesSelected = output<File[]>();
  accept = input<string>('.csv');
  name = input<string>('');
  input = viewChild<ElementRef>('input');

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      this.filesSelected.emit([file]);
    }
  }

  clear() {
    if (!this.input()?.nativeElement) {
      return
    }
    this.input()!.nativeElement.value = '';
    this.input()!.nativeElement.files = null;
  }
}
