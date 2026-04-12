import {ChangeDetectionStrategy, Component, effect, inject} from '@angular/core';
import {DevSettingsService} from '../../../../shared/service/services/dev-settings.service';
import {RadioComponent} from '../../../controls/form/radio.component';
import {FlexColumnComponent} from '../../../../shared/view/layout/flex-column.component';
import {FlexRowComponent} from '../../../../shared/view/layout/flex-row.component';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ContainerComponent} from '../../../../shared/view/layout/container.component';
import {TitleComponent} from '../../../../shared/view/layout/title.component';
import {InputComponent} from '../../../controls/form/input.component';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {debounceTime} from 'rxjs';
import {ControlComponent} from '../../../controls/form/control-item/control.component';
import {ButtonComponent} from '../../../../shared/view/ui/button/button.component';

@Component({
  selector: 'lg-dev-settings',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lg-container>
      <lg-title>Dev Settings</lg-title>
      <lg-flex-column size="medium">
        <lg-button [link]="'/feature-flags'" style="secondary">Feature Flags</lg-button>

        @for (setting of settings(); track setting[0]) {
          <lg-flex-row [center]="true"
                       [size]="'small'"
                       [formGroup]="form">
            @if (isString(setting[0])) {
              <lg-control [label]="labelsMap[setting[0]]">
                <lg-input [name]="'setting-' + setting[0]"
                          [formControlName]="'setting-' + setting[0]"/>
              </lg-control>
            } @else {
              <lg-radio [markOnHover]="true"
                        [formControlName]="'setting-' + setting[0]"
                        [size]="'small'"
                        [noMark]="true"
                        [name]="'setting-' + setting[0]">
                {{ labelsMap[setting[0]] }}
              </lg-radio>
            }
          </lg-flex-row>
        }
      </lg-flex-column>
    </lg-container>
  `,
  imports: [
    RadioComponent,
    FlexColumnComponent,
    FlexRowComponent,
    FormsModule,
    ContainerComponent,
    TitleComponent,
    InputComponent,
    ReactiveFormsModule,
    ControlComponent,
    ButtonComponent,
  ]
})
export class DevSettingsComponent {
  constructor() {
    effect(() => {
      const settings = this.settings();
      settings.forEach(setting => {
        this.form.addControl(
          'setting-' + setting[0],
          new FormControl(this.isString(setting[0]) ? String(setting[1] || '') : !!setting[1]),
          {emitEvent: false}
        );
      });
    });

    this.form.valueChanges.pipe(
      takeUntilDestroyed(),
      debounceTime(500),
    ).subscribe(value => {
      Object.entries(value)
        .forEach(([key, val]) => {
          const settingKey = key.replace('setting-', '');
          this.devSettingsService.setSetting(
            settingKey as any,
            this.isString(settingKey) ? String(val) : !!val
          );
        });
    });
  }

  readonly devSettingsService = inject(DevSettingsService);
  readonly settings = this.devSettingsService.settings;
  readonly form = new FormGroup({});
  readonly labelsMap: Record<string, string> = {
    ga_analytics: 'Enable GA analytics'
  };

  isString(settingKey: string) {
    return settingKey.endsWith('Str');
  }
}
