import {Component, inject, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {Chart, ChartConfiguration, ChartDataset} from 'chart.js/auto';
import {ChangeLogEntry} from '../../history/changes-log.service';
import {ProductFactory} from '../service/product.factory';
import {UserCurrencyPipe} from '../../../shared/view/pipes/userCurrency.pipe';
import {DecimalPipe} from '@angular/common';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {UnitStringPipe} from "../../../shared/view/pipes/unitString.pipe";

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
    UnitStringPipe
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
  private _unitStringPipe = inject(UnitStringPipe);

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
    if (!this.chartCanvas) return;

    if (this.chart) {
      this.chart.destroy();
    }

    const timestamps = this.changes
      .map(c => c.timestamp)
      .toSorted((a, b) => a - b);

    const data = timestamps.reduce((acc, ts) => {
      const entry = this.changes.find(c => c.timestamp <= ts);
      acc.priceData.push(entry ? Number(entry.newValue.price) : null);
      acc.amountData.push(entry ? Number(entry.newValue.amount) : null);
      acc.pricePerUnitData.push(entry ? this._productFactory.fromRaw(entry.newValue).pricePerUnit : null);
      acc.unitsData.push(entry ? String(entry.newValue.unit) : null);
      return acc;
    }, {
      priceData: [],
      amountData: [],
      pricePerUnitData: [],
      unitsData: []
    } as {
      priceData: (number | null)[],
      amountData: (number | null)[],
      pricePerUnitData: (number | null)[],
      unitsData: (string | null)[]
    });

    const normalizedPrice = this.normalizeArray(data.priceData);
    const normalizedAmount = this.normalizeArray(data.amountData);
    const normalizedPricePerUnit = this.normalizeArray(data.pricePerUnitData);
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
        labels: timestamps.map((ts, i) => `#${i + 1} - ${new Date(ts).toLocaleDateString()}`),
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
                    return data.priceData[index] ? this._priceTooltipLabel(data.priceData[index]) : '';
                  case labelAmount:
                    return data.amountData[index] ? this._amountTooltipLabel(data.amountData[index], data.unitsData[index]!)  : '';
                  case labelPricePerUnit:
                    return data.pricePerUnitData[index] ? this._pricePerUnitTooltipLabel(data.pricePerUnitData[index], data.unitsData[index]!)  : '';
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

  private _priceTooltipLabel(value: number | null): string {
    return `${this._labels.price}: ${this._userCurrencyPipe.transform(value ?? '', this.pipesDigits)}`;
  }

  private _amountTooltipLabel(
    value: number | null,
    unit: string,
  ): string {
    return `${this._labels.amount}: ${this._decimalPipe.transform(value, this.pipesDigits)} ${this._unitLabel(unit)}`;
  }

  private _pricePerUnitTooltipLabel(
    value: number | null,
    unit: string,
  ): string {
    return `${this._labels.pricePerUnit}: ${this._userCurrencyPipe.transform(value ?? '', this.pipesDigits)}${this._unitLabel(unit)}`;
  }

  private _unitLabel(unit: string): string {
    return this._translateService.instant('per-unit.label', {
      unit: this._translateService.instant(this._unitStringPipe.transform(unit) || '')
    });
  }

  // <span [translateParams]="{unit: change.oldProduct.unit | unitString | translate}"
  //                      [translate]="'per-unit.label'"></span>

  private normalizeArray(arr: (number | null)[]): Array<number | null> {
    const valid = arr.filter(v => v !== null) as number[];
    if (valid.length === 0) return arr.map(() => 0);
    const min = Math.min(...valid);
    const max = Math.max(...valid);
    const range = max - min || 1;
    return arr.map(v => v === null ? null : (v - min) / range);
  }
}
