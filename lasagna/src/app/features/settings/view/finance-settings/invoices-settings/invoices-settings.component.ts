import {AfterViewInit, Component, DestroyRef, inject, signal} from '@angular/core';
import {FlexColumnComponent} from '../../../../../shared/view/layout/flex-column.component';
import {InputComponent} from '../../../../controls/form/input.component';


import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {FlexRowComponent} from '../../../../../shared/view/layout/flex-row.component';
import {SettingsService} from '../../../service/services/settings.service';

import {NumberInputComponent} from '../../../../controls/form/number-input.component';
import {FileInputComponent} from '../../../../controls/form/file-input.component';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {debounceTime} from 'rxjs';
import {TranslatePipe} from '@ngx-translate/core';
import {ControlComponent} from '../../../../controls/form/control-item/control.component';

@Component({
  selector: 'lg-invoices-settings',
  standalone: true,
  template: `
    <lg-flex-column [formGroup]="form"
                    size="medium">
      <lg-control [label]=" 'settings.invoices.logo' | translate">
        @if (logoBase64()) {
          <div class="lg-invoices-settings__logo">
            <img [src]="logoBase64()"
                 alt="Logo">
          </div>
        }

        <lg-file-input [buttonStyle]="logoBase64() ? 'danger' : 'default'"
                       [buttonText]="logoBase64() ? ('settings.invoices.replace-logo' | translate) : ('settings.invoices.upload-logo' | translate)"
                       formControlName="logo"></lg-file-input>
      </lg-control>

      <lg-control [label]=" 'settings.invoices.prefix' | translate">
        <lg-input formControlName="prefix"></lg-input>
      </lg-control>

      <lg-control [label]=" 'settings.invoices.precision' | translate">
        <lg-flex-row>
          <lg-control [label]=" 'settings.invoices.precision-rows' | translate">
            <lg-number-input formControlName="precisionRows"></lg-number-input>
          </lg-control>

          <lg-control [label]=" 'settings.invoices.precision-totals' | translate">
            <lg-number-input formControlName="precisionTotals"></lg-number-input>
          </lg-control>
        </lg-flex-row>
      </lg-control>
    </lg-flex-column>
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
    FlexColumnComponent,
    InputComponent,
    ReactiveFormsModule,
    FlexRowComponent,
    NumberInputComponent,
    FileInputComponent,
    TranslatePipe,
    ControlComponent
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
