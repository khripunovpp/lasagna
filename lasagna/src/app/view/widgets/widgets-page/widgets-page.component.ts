import {Component} from '@angular/core';
import {EggsWidgetComponent} from '../eggs-widget/eggs-widget.component';


import {ContainerComponent} from '../../ui/layout/container/container.component';
import {GapRowComponent} from '../../ui/layout/gap-row.component';
import {TitleComponent} from '../../ui/layout/title/title.component';
import {CardComponent} from '../../ui/card/card.component';

import {BarcodeSeekerWidgetComponent} from '../barcode-seeker/barcode-seeker.component';
import {FadeInComponent} from '../../ui/fade-in.component';
import {LocalisationSettingsComponent} from '@view/settings/localisation/localisation-settings.component';
import {TabDirective} from '@view/ui/tabs/tab.directive';
import {TabsComponent} from '@view/ui/tabs/tabs.component';
import {TranslatePipe} from '@ngx-translate/core';
import {JellyWidgetComponent} from '@view/widgets/jelly-widget/jelly-widget.component';

@Component({
  selector: 'lg-widgets-page',
  standalone: true,
  template: `
    <lg-fade-in>
      <lg-container>
        <lg-gap-row [center]="true">
          <lg-title>
            Widgets
          </lg-title>
        </lg-gap-row>

        <lg-tabs>
          <ng-template label="Jelly calculator" alias="jelly-calculator" lgTab>
             <lg-jelly-widget></lg-jelly-widget>
          </ng-template>

          <ng-template label="Eggs calculator" alias="eggs-calculator" lgTab>
             <lg-eggs-widget></lg-eggs-widget>
          </ng-template>

          <ng-template label="Barcode Seeker" alias="barcode-seeker" lgTab>
              <lg-barcode-add-product-widget></lg-barcode-add-product-widget>
          </ng-template>
        </lg-tabs>
      </lg-container>
    </lg-fade-in>
  `,
  imports: [
    EggsWidgetComponent,
    ContainerComponent,
    GapRowComponent,
    TitleComponent,
    CardComponent,
    BarcodeSeekerWidgetComponent,
    FadeInComponent,
    LocalisationSettingsComponent,
    TabDirective,
    TabsComponent,
    TranslatePipe,
    JellyWidgetComponent
  ]
})
export class WidgetsPageComponent {
}
