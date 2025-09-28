import {Component, inject, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {Chart, ChartConfiguration, ChartDataset} from 'chart.js/auto';
import {ChangeLogEntry} from '../../history/changes-log.service';
import {ProductFactory} from '../service/product.factory';
import {UserCurrencyPipe} from '../../../shared/view/pipes/userCurrency.pipe';
import {DecimalPipe} from '@angular/common';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'lg-product-changes-chart',
  template: `
    <canvas #chartCanvas [hidden]="!changes.length"></canvas>

    @if (!changes.length) {
      <p class="text-muted no-margin">
        {{ 'price-change-history.no-changes' | translate }}
      </p>
    }
  `,
  styles: [`
    canvas {
    }
  `],
  imports: [
    TranslatePipe
  ],
  providers: [
    UserCurrencyPipe,
    DecimalPipe,
  ]
})
export class ProductChangesChartComponent
  implements OnChanges {
  constructor(
    private _translateService: TranslateService,
  ) {
  }

  @Input() changes: ChangeLogEntry[] = [];
  @ViewChild('chartCanvas') chartCanvas: any;
  chart: Chart | null = null;
  readonly pipesDigits = '1.0-4';
  private _productFactory = inject(ProductFactory);
  private _decimalPipe = inject(DecimalPipe);
  private _userCurrencyPipe = inject(UserCurrencyPipe);

  private get _labels() {
    return {
      price: this._translateService.instant('price-change-history.chart.price'),
      amount: this._translateService.instant('price-change-history.chart.amount'),
      pricePerUnit: this._translateService.instant('price-change-history.chart.price-per-unit'),
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['changes']) {
      this.buildChart();
    }
  }

  private buildChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    // Фильтруем изменения по интересующим полям
    const priceChanges = this.changes
      .filter(c => c.entity === 'product' && 'price' in c.newValue);
    const amountChanges = this.changes
      .filter(c => c.entity === 'product' && 'amount' in c.newValue);
    const pricePerUnitChanges = this.changes
      .filter(c => c.entity === 'product' && c.newValue.price && c.newValue.amount);

    // Подготовка данных
    const timestamps = Array.from(new Set([
      ...priceChanges.map(c => c.timestamp),
      ...amountChanges.map(c => c.timestamp),
      ...pricePerUnitChanges.map(c => c.timestamp)
    ])).sort((a, b) => a - b);

    const priceData = timestamps.map(ts => {
      const entry = priceChanges.find(c => c.timestamp <= ts);
      return entry ? Number(entry.newValue.price) : null;
    });

    const amountData = timestamps.map(ts => {
      const entry = amountChanges.find(c => c.timestamp <= ts);
      return entry ? Number(entry.newValue.amount) : null;
    });

    const pricePerUnitData = timestamps.map(ts => {
      const entry = pricePerUnitChanges.find(c => c.timestamp <= ts);
      return entry ? this._productFactory.fromRaw(entry.newValue).pricePerUnit : null;
    });

    const normalizedPrice = this.normalizeArray(priceData);
    const normalizedAmount = this.normalizeArray(amountData);
    const normalizedPricePerUnit = this.normalizeArray(pricePerUnitData);
    const labelPrice = this._labels.price;
    const labelAmount = this._labels.amount;
    const labelPricePerUnit = this._labels.pricePerUnit;

    const datasets: ChartDataset<'line'>[] = [
      {
        label: labelPrice,
        data: normalizedPrice,
        borderColor: '#ea5454',
        pointStyle: 'circle',
        pointRadius: 5,
        pointBackgroundColor: '#ea5454',
        pointBorderColor: 'white',
        fill: false,
        tension: 0.4,
        yAxisID: 'yPrice'
      },
      {
        label: labelAmount,
        data: normalizedAmount,
        borderColor: '#6874e4',
        pointStyle: 'triangle',
        pointRadius: 5,
        pointBackgroundColor: '#6874e4',
        pointBorderColor: 'white',
        fill: false,
        tension: 0.4,
        yAxisID: 'yAmount'
      },
      {
        label: labelPricePerUnit,
        data: normalizedPricePerUnit,
        borderColor: '#3a9747',
        pointStyle: 'rectRot',
        pointRadius: 5,
        pointBackgroundColor: '#3a9747',
        pointBorderColor: 'white',
        fill: false,
        tension: 0.4,
        yAxisID: 'yPrice'
      },
    ];

    const config: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        labels: timestamps.map(ts => new Date(ts).toLocaleString()),
        datasets,
      },
      options: {
        animation: false,
        responsive: true,
        interaction: {
          intersect: false
        },
        plugins: {
          legend: {display: true},
          tooltip: {
            callbacks: {
              label: (context) => {
                const index = context.dataIndex!;
                switch (context.dataset.label) {
                  case labelPrice:
                    return `${labelPrice}: ${this._decimalPipe.transform(priceData[index], this.pipesDigits)}`;
                  case labelAmount:
                    return `${labelAmount}: ${this._decimalPipe.transform(amountData[index], this.pipesDigits)}`;
                  case labelPricePerUnit:
                    return `${labelPricePerUnit}: ${this._userCurrencyPipe.transform(pricePerUnitData[index] ?? '', this.pipesDigits)}`;
                  default:
                    return '';
                }
              }
            }
          }
        },
        scales: {
          x: {
            title: {display: false},
            ticks: {
              display: false // убираем все подписи на оси X
            },
            grid: {
              drawTicks: true, // можно оставить только засечки
              tickLength: 8
            }
          },
          yAmount: {
            type: 'linear',
            position: 'left',
            title: {display: false},
            ticks: {
              display: false // убираем все подписи на оси Y
            },
          },
          yPrice: {
            type: 'linear',
            ticks: {
              display: false // убираем все подписи на оси Y
            },
            position: 'right',
            title: {display: false},
            grid: {drawOnChartArea: false} // чтобы сетка не мешала
          }
        }
      }
    };

    this.chart = new Chart(this.chartCanvas.nativeElement, config);
  }


  private normalizeArray(arr: (number | null)[]): Array<number | null> {
    const valid = arr.filter(v => v !== null) as number[];
    if (valid.length === 0) return arr.map(() => 0);
    const min = Math.min(...valid);
    const max = Math.max(...valid);
    const range = max - min || 1;
    return arr.map(v => v === null ? null : (v - min) / range);
  }
}
