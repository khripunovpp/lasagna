import {Component} from '@angular/core';
import {EggsWidgetComponent} from '../eggs-widget/eggs-widget.component';


import {ContainerComponent} from '../../ui/layout/container/container.component';
import {FlexRowComponent} from '../../ui/layout/flex-row.component';
import {TitleComponent} from '../../ui/layout/title/title.component';


import {BarcodeSeekerWidgetComponent} from '../barcode-seeker/barcode-seeker.component';
import {FadeInComponent} from '../../ui/fade-in.component';

import {TabDirective} from '../../ui/tabs/tab.directive';
import {TabsComponent} from '../../ui/tabs/tabs.component';

import {JellyWidgetComponent} from '../jelly-widget/jelly-widget.component';

@Component({
  selector: 'lg-widgets-page',
  standalone: true,
  template: `
    <lg-fade-in>
      <lg-container>
        <lg-flex-row [center]="true">
          <lg-title>
            Widgets
          </lg-title>
        </lg-flex-row>

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
    FlexRowComponent,
    TitleComponent,
    BarcodeSeekerWidgetComponent,
    FadeInComponent,
    TabDirective,
    TabsComponent,
    JellyWidgetComponent
]
})
export class WidgetsPageComponent {
}
