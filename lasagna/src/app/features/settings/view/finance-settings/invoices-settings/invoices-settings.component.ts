import {AfterViewInit, Component, DestroyRef, inject, signal} from '@angular/core';
import {GapColumnComponent} from '../../../../../shared/view/ui/layout/gap-column.component';
import {InputComponent} from '../../../../../shared/view/ui/form/input.component';
import {TitleComponent} from '../../../../../shared/view/ui/layout/title/title.component';

import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {GapRowComponent} from '../../../../../shared/view/ui/layout/gap-row.component';
import {SettingsService} from '../../../service/services/settings.service';

import {NumberInputComponent} from '../../../../../shared/view/ui/form/number-input.component';
import {FileInputComponent} from '../../../../../shared/view/ui/form/file-input.component';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {debounceTime} from 'rxjs';

@Component({
  selector: 'lg-invoices-settings',
  standalone: true,
  template: `
      <lg-gap-column [formGroup]="form">
          <lg-gap-column size="medium">
              <lg-title [level]="5">
                  Logo
              </lg-title>

              @if (logoBase64()) {
                  <div class="lg-invoices-settings__logo">
                      <img [src]="logoBase64()"
                           alt="Logo">
                  </div>
              }

              <lg-file-input [buttonStyle]="logoBase64() ? 'danger' : 'default'"
                             [buttonText]="logoBase64() ? 'Replace with new one' : 'Upload logo'"
                             formControlName="logo"></lg-file-input>
          </lg-gap-column>

          <lg-gap-column size="medium">
              <lg-title [level]="5">
                  Prefix for invoices
              </lg-title>

              <lg-input formControlName="prefix"></lg-input>
          </lg-gap-column>

          <lg-gap-column size="medium">
              <lg-title [level]="5">
                  Precision
              </lg-title>

              <lg-gap-row>
                  <lg-gap-column size="small">
                      <lg-title [flat]="true" [level]="6">
                          For rows
                      </lg-title>
                      <lg-number-input formControlName="precisionRows"></lg-number-input>
                  </lg-gap-column>

                  <lg-gap-column size="small">
                      <lg-title [flat]="true" [level]="6">
                          For totals
                      </lg-title>
                      <lg-number-input formControlName="precisionTotals"></lg-number-input>
                  </lg-gap-column>
              </lg-gap-row>
          </lg-gap-column>
      </lg-gap-column>
  `,
  styles: [`
    .lg-invoices-settings__logo {
      width: 100%;
      max-width: 200px;
      height: auto;
      border-radius: 12px;
      object-fit: cover;
      background-color: var(--control-bg);
      padding: 15px;

      img {
        width: 100%;
        height: auto;
      }
    }
  `],
  imports: [
    GapColumnComponent,
    InputComponent,
    TitleComponent,
    ReactiveFormsModule,
    GapRowComponent,
    NumberInputComponent,
    FileInputComponent
  ]
})
export class InvoicesSettingsComponent
  implements AfterViewInit {
  constructor(
    private _settingsService: SettingsService,
  ) {
  }

  prefix?: string;

  form = new FormGroup({
    prefix: new FormControl<string | null>(null),
    precisionRows: new FormControl<number | null>(null),
    precisionTotals: new FormControl<number | null>(null),
    logo: new FormControl<File | null>(null)
  })
  logoBase64 = signal<string | null>(null);
  destroyRef = inject(DestroyRef);

  ngAfterViewInit() {
    const precisions = this._settingsService.getInvoicePrecision();
    this.form.patchValue({
      prefix: this._settingsService.getInvoicePrefix(),
      precisionRows: precisions[0] ?? 2,
      precisionTotals: precisions[1] ?? 2,
    });

    this.logoBase64.set(this._settingsService.getInvoiceLogo() ?? null);

    this.form.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef),
      debounceTime(500),
    ).subscribe(async value => {
      if (value.logo) {
        this.logoBase64.set(await this.resizeAndCropImageToBase64(value.logo));
      }

      this._settingsService.setInvoiceLogo(this.logoBase64());
      this._settingsService.setInvoicePrefix(value.prefix ?? '');
      this._settingsService.setInvoicePrecisions(
        value.precisionRows ?? 2, value.precisionTotals ?? 2
      );
      await this._settingsService.saveSettings();
    });
  }

  resizeAndCropImageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d')!;
          canvas.width = 200;
          canvas.height = 200;

          const imgWidth = img.width;
          const imgHeight = img.height;

          const x = (canvas.width - imgWidth) / 2;
          const y = (canvas.height - imgHeight) / 2;

          ctx.drawImage(img, x, y);
          const base64 = canvas.toDataURL('image/png');
          document.body.appendChild(canvas)
          resolve(base64);
        };
        img.onerror = reject;
        img.src = reader.result as string;
      };

      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}
