import {
  Component,
  forwardRef,
  input,
  OnInit,
  Optional,
  output,
  signal,
  viewChild,
  ViewEncapsulation
} from '@angular/core';
import {NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent} from '@ng-select/ng-select';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SelectResourcesService} from '../../../service/services/select-resources.service';



export interface MultiselectItem {
  value: unknown
}

@Component({
  selector: 'lg-multiselect',
  standalone: true,
  template: `
      <div class="multiselect">
          <ng-select (change)="onChangeSelect($event)"
                     (ngModelChange)="onChangeInput($event)"
                     [compareWith]="compareWith"
                     [multiple]="multi()"
                     [items]="loadedList()"
                     [ngModel]="value"
                     [searchFn]="searchFn">
              <ng-template let-item="item" ng-label-tmp>
                  {{ item?.name ?? item?.value ?? item }}
              </ng-template>
              <ng-template let-item="item" ng-option-tmp>
                  {{ item?.name ?? item?.value ?? item }}
              </ng-template>
          </ng-select>
      </div>
  `,
  imports: [
    NgSelectComponent,
    FormsModule,
    NgOptionTemplateDirective,
    NgLabelTemplateDirective
],
  styles: [
    `
      lg-multiselect {
        display: flex;
        flex: 1;
        min-width: 150px;
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
      useExisting: forwardRef(() => MultiselectComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class MultiselectComponent
  implements ControlValueAccessor, OnInit {
  constructor(
    @Optional() private _selectResourcesService: SelectResourcesService,
  ) {
  }

  resource = input<string>('');
  autoLoad = input<boolean>(false);
  multi = input<boolean>(false);
  loadedList = signal([]);
  onSelected = output<unknown>();
  value?: unknown = null
  selectComponent = viewChild(NgSelectComponent);

  onChange: (value: unknown) => void = () => {
  };

  onTouched: () => void = () => {
  };

  searchFn = (term: string, item: MultiselectItem) => {
    const val = item as any;
    return val.name?.toLowerCase().includes(term.toLowerCase())
      || val?.toString().toLowerCase().includes(term.toLowerCase())
  }

  compareWith = (a: MultiselectItem, b: MultiselectItem) => {
    const valA = a as any;
    const valB = b as any;

    return valA?.uuid === valB
      || valA === valB
      || valA?.uuid === valB?.uuid
      || valA === valB?.uuid;
  }

  writeValue(value: unknown): void {
    debugger
    this.change(value);
    this.selectComponent()!.searchTerm = '';
  }

  change(value: unknown) {
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
    this.change(value);
  }

  onChangeSelect(value: unknown) {
    this.change(value);
    this.onSelected.emit(value);
  }

  ngOnInit() {
    this._selectResourcesService.register(this.resource());
    if (this.autoLoad()) {
      this._selectResourcesService.load([this.resource()]);
    }
    this._selectResourcesService.subscribe((registry) => {
      const items = registry.get(this.resource())?.list ?? [];
      this.loadedList.set(items as any);
    });
  }

  reload() {
    return this._selectResourcesService.load([this.resource()], true);
  }
}
