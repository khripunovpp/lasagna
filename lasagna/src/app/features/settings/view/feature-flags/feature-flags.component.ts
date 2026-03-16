import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FeatureFlagsService} from '../../../../shared/service/services/feature-flags.service';
import {RadioComponent} from '../../../controls/form/radio.component';
import {FlexColumnComponent} from '../../../../shared/view/layout/flex-column.component';
import {FlexRowComponent} from '../../../../shared/view/layout/flex-row.component';
import {FormsModule} from '@angular/forms';
import {ContainerComponent} from '../../../../shared/view/layout/container.component';
import {TitleComponent} from '../../../../shared/view/layout/title.component';

@Component({
  selector: 'lg-feature-flags',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lg-container>
      <lg-title>Feature Flags</lg-title>
      <lg-flex-column size="medium">
        @for (flag of flags(); track flag[0]) {
          <lg-flex-row [center]="true" [size]="'small'">
            <lg-radio [markOnHover]="true"
                      [size]="'small'"
                      [noMark]="true"
                      [name]="'flag-' + flag[0]"
                      [ngModel]="flag[1]"
                      (ngModelChange)="featureFlagsService.setFlag(flag[0], $any($event))">
              {{ flag[0] }}
            </lg-radio>
          </lg-flex-row>
        }
      </lg-flex-column>
    </lg-container>
  `,
  imports: [RadioComponent, FlexColumnComponent, FlexRowComponent, FormsModule, ContainerComponent, TitleComponent]
})
export class FeatureFlagsComponent {
  readonly featureFlagsService = inject(FeatureFlagsService);
  readonly flags = this.featureFlagsService.flags;

}
