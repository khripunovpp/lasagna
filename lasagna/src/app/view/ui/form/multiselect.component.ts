import {Component, input, OnInit, Optional, signal, ViewEncapsulation} from '@angular/core';
import {NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent} from '@ng-select/ng-select';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SelectResourcesService} from '../../../service/services/select-resources.service';
import {IndexDbSelectLoaderService} from '../../../service/services/index-db-select-loader.service';
import {JsonPipe} from '@angular/common';

export interface MultiselectItem {
  value: unknown
}

@Component({
  selector: 'lg-multiselect',
  standalone: true,
  template: `
      <div class="multiselect">
          <ng-select (ngModelChange)="onChangeInput($event)"
                     [items]="loadedList()"
                     bindValue="value"
                     [ngModel]="value">
              <ng-template let-item="item" ng-label-tmp>
                  {{ item.value.name }}
              </ng-template>
              <ng-template let-item="item" ng-option-tmp>
                  {{ item.value.name }}
              </ng-template>
          </ng-select>
      </div>
  `,
  imports: [
    NgSelectComponent,
    FormsModule,
    JsonPipe,
    NgOptionTemplateDirective,
    NgLabelTemplateDirective
  ],
  styles: [
    `
      lg-multiselect {
        display: flex;
        flex: 1;
      }

      .multiselect {
        flex: 1;

        .ng-select.ng-select-single .ng-select-container {
          height: 51px;
        }

        .ng-select .ng-select-container {
          border: none;
          border-radius: 12px;
          background-color: var(--control-bg);

          .ng-input {
            top: 16px !important;

            & > input {
              color: var(--text);
              font-family: inherit;
              font-size: inherit;
            }
          }
        }

        .ng-dropdown-panel {
          border: none;
          box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.1);
          border-radius: 12px;
          overflow: hidden;

          .ng-option {
            padding: 16px;
            border-radius: 12px;
          }
        }
      }

    `
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MultiselectComponent,
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class MultiselectComponent
  implements ControlValueAccessor, OnInit {
  constructor(
    @Optional() private _selectResourcesService: SelectResourcesService,
    @Optional() private _indexDbSelectLoaderService: IndexDbSelectLoaderService
  ) {
  }

  resource = input<string>('');
  loadedList = signal([]);
  value?: unknown = null
  onChange: (value: unknown) => void = () => {
  };
  onTouched: () => void = () => {
  };

  writeValue(value: unknown): void {
    this.value = value;
    this.onChange(this.value);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  onChangeInput(value: unknown) {
    this.onChange(value);
  }

  ngOnInit() {
    this._selectResourcesService.register(this.resource());
    this._selectResourcesService.subscribe((registry) => {
      const items = registry.get(this.resource())?.list ?? [];
      this.loadedList.set(items.map<{
        value: unknown
      }>((item) => ({
        value: item
      })) as any);
    });
  }
}
