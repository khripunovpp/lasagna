import {Component} from '@angular/core';
import {EggsWidgetComponent} from '../eggs-widget/eggs-widget.component';


import {ContainerComponent} from '../../../shared/view/ui/layout/container/container.component';
import {FlexRowComponent} from '../../../shared/view/ui/layout/flex-row.component';
import {TitleComponent} from '../../../shared/view/ui/layout/title/title.component';


import {BarcodeSeekerWidgetComponent} from '../barcode-seeker/barcode-seeker.component';
import {FadeInComponent} from '../../../shared/view/ui/fade-in.component';

import {TabDirective} from '../../../shared/view/ui/tabs/tab.directive';
import {TabsComponent} from '../../../shared/view/ui/tabs/tabs.component';

import {JellyWidgetComponent} from '../jelly-widget/jelly-widget.component';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'lg-widgets-page',
  standalone: true,
  template: `
    <lg-fade-in>
      <lg-container>
        <lg-flex-row [center]="true">
          <lg-title>
            {{ 'widgets.page.title' | translate }}
          </lg-title>
        </lg-flex-row>

        <lg-tabs>
          <ng-template [label]="'widgets.page.jelly-calculator' | translate" alias="jelly-calculator" lgTab>
             <lg-jelly-widget></lg-jelly-widget>
          </ng-template>

          <ng-template [label]="'widgets.page.eggs-calculator' | translate" alias="eggs-calculator" lgTab>
             <lg-eggs-widget></lg-eggs-widget>
          </ng-template>

<!--          <ng-template [label]="'widgets.page.barcode-seeker' | translate" alias="barcode-seeker" lgTab>-->
<!--              <lg-barcode-add-product-widget></lg-barcode-add-product-widget>-->
<!--          </ng-template>-->
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
    JellyWidgetComponent,
    TranslatePipe
]
})
export class WidgetsPageComponent {
}
