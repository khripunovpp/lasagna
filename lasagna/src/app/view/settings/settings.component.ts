import {Component} from '@angular/core';
import {AddProductFormComponent} from '../product/add-product/add-product-form.component';
import {ButtonComponent} from '../ui/layout/button.component';
import {CardComponent} from '../ui/card/card.component';
import {ContainerComponent} from '../ui/layout/container/container.component';
import {GapRowComponent} from '../ui/layout/gap-row.component';
import {TitleComponent} from '../ui/layout/title/title.component';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'lg-settings',
  standalone: true,
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  imports: [
    AddProductFormComponent,
    ButtonComponent,
    CardComponent,
    ContainerComponent,
    GapRowComponent,
    TitleComponent,
    RouterLink,
    RouterLinkActive
  ]
})
export class SettingsComponent {
}
