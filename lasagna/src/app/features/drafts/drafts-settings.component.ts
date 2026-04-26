import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {debounceTime} from 'rxjs';
import {TranslatePipe} from '@ngx-translate/core';
import {FlexColumnComponent} from '../../shared/view/layout/flex-column.component';
import {ControlComponent} from '../controls/form/control-item/control.component';
import {SwitchComponent} from '../controls/form/switch.component';
import {NumberInputComponent} from '../controls/form/number-input.component';
import {SettingsService} from '../settings/service/services/settings.service';
import {DRAFTS_TTL_MAX, DRAFTS_TTL_MIN} from '../settings/const/settings-keys.const';
import {QuestionMarkComponent} from '../../shared/view/ui/question-mark.component';
import {ControlExtraTemplateDirective} from '../controls/form/control-extra-template.directive';
import {FlexRowComponent} from '../../shared/view/layout/flex-row.component';

@Component({
  selector: 'lg-drafts-settings',
  standalone: true,
  imports: [
    FlexColumnComponent,
    ReactiveFormsModule,
    TranslatePipe,
    ControlComponent,
    SwitchComponent,
    NumberInputComponent,
    QuestionMarkComponent,
    ControlExtraTemplateDirective,
    FlexRowComponent,
  ],
  template: `
    <lg-flex-column [formGroup]="form" size="medium">
      <lg-control [label]="'settings.drafts.enabled' | translate">
        <lg-flex-row [strictCenter]="true" [size]="'small'">
          <lg-switch formControlName="enabled"
                     name="drafts-enabled">
          </lg-switch>

          <lg-question [text]="'settings.drafts.enabled.hint'  | translate"></lg-question>
        </lg-flex-row>
      </lg-control>

      <lg-control [label]="'settings.drafts.ttl-days' | translate">
        <lg-number-input [max]="ttlMax"
                         [min]="ttlMin"
                         formControlName="ttlDays"
                         name="drafts-ttl-days">
          <ng-template lgExtraTpl place="after">
            <lg-question [text]="'settings.drafts.ttl-days.hint' | translate:{min: ttlMin, max: ttlMax}"></lg-question>
          </ng-template>
        </lg-number-input>
      </lg-control>
    </lg-flex-column>
  `,
})
export class DraftsSettingsComponent implements OnInit {
  protected readonly ttlMin = DRAFTS_TTL_MIN;
  protected readonly ttlMax = DRAFTS_TTL_MAX;

  protected readonly form = new FormGroup({
    enabled: new FormControl<boolean>(true, {nonNullable: true}),
    ttlDays: new FormControl<number>(DRAFTS_TTL_MAX, {nonNullable: true}),
  });

  private readonly _settingsService = inject(SettingsService);
  private readonly _destroyRef = inject(DestroyRef);

  ngOnInit() {
    const {enabled, ttlDays} = this._settingsService.getDraftsSettings();
    this.form.patchValue({enabled, ttlDays}, {emitEvent: false});

    this.form.valueChanges.pipe(
      takeUntilDestroyed(this._destroyRef),
      debounceTime(300),
    ).subscribe((value) => {
      const ttl = Math.min(this.ttlMax, Math.max(this.ttlMin, Math.floor(value.ttlDays ?? this.ttlMax)));
      void this._settingsService.setDraftsSettings({
        enabled: !!value.enabled,
        ttlDays: ttl,
      });
    });
  }
}
