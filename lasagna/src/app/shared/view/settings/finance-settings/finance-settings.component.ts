import {Component} from '@angular/core';
import {TaxesSettingsComponent} from '../taxes/taxes-settings.component';
import {GapColumnComponent} from '../../ui/layout/gap-column.component';

/**
 * Компонент для настройки финансовых параметров.
 *
 * - Префикс инвойсов
 * - Адресная книга как заказчиков так и личных платежных данныъ
 * - Список доступных таксов
 * - Округление сумм для строк в инвойсе и тоталов
 */
@Component({
  selector: 'lg-finance-settings',
  standalone: true,
  template: `
      <lg-gap-column>
          <lg-taxes-settings></lg-taxes-settings>
      </lg-gap-column>
  `,
  styles: [``],
  imports: [
    TaxesSettingsComponent,
    GapColumnComponent
  ]
})
export class FinanceSettingsComponent {
}
