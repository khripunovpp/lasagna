import {Component, ElementRef, forwardRef, input, signal, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ButtonComponent, ButtonStyle} from '../layout/button.component';

@Component({
  selector: 'lg-file-input',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
      <div [class.contrast]="theme() === 'contrast'" class="lg-file-input">
          <input #fileInput
                 (change)="onFileChange($event)"
                 [attr.accept]="accept()"
                 [attr.multiple]="multiple() ? '' : null"
                 [disabled]="disable()"
                 class="hidden-input"
                 type="file">

          <lg-button (onClick)="fileInput.click()"
                     [disabled]="disable()"
                     [style]="buttonStyle()"
                     size="small">
              {{ buttonText() }}
          </lg-button>

          <div [style.display]="noAfter() && !errorMessage() ? 'none' : 'flex'" class="lg-file-input__after">
              <ng-content select="after"></ng-content>
              <span *ngIf="errorMessage()" class="error-message">{{ errorMessage() }}</span>
          </div>
      </div>
  `,
  styles: [`
    :host {
      display: flex;
      flex: 1;
    }

    .lg-file-input {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 16px;
      flex: 1;
    }

    .lg-file-input__after {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 0 16px;
      white-space: nowrap;
      flex: 0 0 auto;
    }

    .hidden-input {
      display: none;
    }

    .error-message {
      color: #d32f2f;
      font-size: 13px;
      white-space: nowrap;
    }
  `],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FileInputComponent),
    multi: true
  }]
})
export class FileInputComponent implements ControlValueAccessor {
  @ViewChild('fileInput', {static: true}) fileInput!: ElementRef<HTMLInputElement>;

  accept = input<string>(''); // image/*, .pdf и т.п.
  multiple = input<boolean>(false);
  disable = input<boolean>(false);
  theme = input<'default' | 'contrast'>('default');
  base64Mode = input<boolean>(false);
  buttonStyle = input<ButtonStyle>('default'); // стиль lg-button
  buttonText = input<string>('Загрузить файл'); // текст на кнопке
  fileSizeLimitMb = input<number>(2); // Лимит по умолчанию: 2MB
  noAfter = signal(false);
  errorMessage = signal<string | null>(null);

  writeValue(value: any): void {
    // Ничего не делаем
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  async onFileChange(event: Event) {
    const inputEl = event.target as HTMLInputElement;
    const files = inputEl.files;
    if (!files || files.length === 0) {
      this.onChange(null);
      return;
    }

    const overLimitFiles = Array.from(files).filter(file => file.size > this.fileSizeLimitMb() * 1024 * 1024);
    if (overLimitFiles.length > 0) {
      this.errorMessage.set(`Файл превышает ${this.fileSizeLimitMb()}MB`);
      this.onChange(null);
      return;
    } else {
      this.errorMessage.set(null); // очищаем сообщение, если всё ок
    }

    let result: any;

    if (this.base64Mode()) {
      const base64List = await Promise.all(
        Array.from(files).map(file => this.readFileAsBase64(file))
      );
      result = this.multiple() ? base64List : base64List[0];
    } else {
      result = this.multiple() ? Array.from(files) : files[0];
    }

    this.onChange(result);
    this.onTouched();
  }

  ngAfterViewInit() {
    const after = this.fileInput?.nativeElement.nextElementSibling?.nextElementSibling;
    if (after?.childElementCount === 0) {
      this.noAfter.set(true);
    }
  }

  focus() {
    this.fileInput?.nativeElement.focus();
  }

  private onChange: (value: string | File | string[] | File[] | null) => void = () => {
  };

  private onTouched: () => void = () => {
  };

  private readFileAsBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  }
}
