import {ChangeDetectionStrategy, Component, effect, inject} from '@angular/core';
import {FeatureFlagsService} from '../../../../shared/service/services/feature-flags.service';
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

@Component({
  selector: 'lg-feature-flags',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lg-container>
      <lg-title>Feature Flags</lg-title>
      <lg-flex-column size="medium">
        @for (flag of flags(); track flag[0]) {
          <lg-flex-row [center]="true"
                       [size]="'small'"
                       [formGroup]="form">
            @if (isString(flag[0])) {
              <lg-control [label]="labelsMap[flag[0]]">
                <lg-input [name]="'flag-' + flag[0]"
                          [formControlName]="'flag-' + flag[0]"/>
              </lg-control>
            } @else {
              <lg-radio [markOnHover]="true"
                        [formControlName]="'flag-' + flag[0]"
                        [size]="'small'"
                        [noMark]="true"
                        [name]="'flag-' + flag[0]">
                {{ labelsMap[flag[0]] }}
              </lg-radio>
            }
          </lg-flex-row>
        }
      </lg-flex-column>
    </lg-container>
  `,
  imports: [RadioComponent, FlexColumnComponent, FlexRowComponent, FormsModule, ContainerComponent, TitleComponent, InputComponent, ReactiveFormsModule, ControlComponent]
})
export class FeatureFlagsComponent {
  constructor() {
    effect(() => {
      const flags = this.flags();
      flags.forEach(flag => {
        this.form.addControl(
          'flag-' + flag[0],
          new FormControl(this.isString(flag[0]) ? String(flag[1] || '') : !!flag[1]),
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
          const flagKey = key.replace('flag-', '');
          this.featureFlagsService.setFlag(
            flagKey as any,
            this.isString(flagKey) ? String(val) : !!val
          );
        });
    });
  }

  readonly featureFlagsService = inject(FeatureFlagsService);
  readonly flags = this.featureFlagsService.flags;
  readonly form = new FormGroup({});
  readonly labelsMap = {
    'invoices': 'Invoices',
    'registration': 'Registration',
    'synchronization': 'Synchronization',
    'synchronizationUrlStr': 'Synchronization URL',
  };

  isString(flagKey: string) {
    return flagKey.endsWith('Str');
  }
}
