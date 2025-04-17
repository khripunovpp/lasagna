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
import {
  NgLabelTemplateDirective,
  NgOptionTemplateDirective,
  NgSelectComponent,
  NgTagTemplateDirective
} from '@ng-select/ng-select';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SelectResourcesService} from '../../../service/services/select-resources.service';
import {debounceTime, of, Subject, switchMap} from 'rxjs';
import {MultiselectItem} from './multiselect.component';


export interface autocompleteItem {
  value: unknown
}

@Component({
  selector: 'lg-autocomplete',
  standalone: true,
  template: `
      <div class="autocomplete">
          <ng-select (change)="onChangeSelect($event)"
                     (ngModelChange)="onChangeInput($event)"
                     (blur)="onBlur()"
                     (search)="onSearch($event)"
                     [addTag]="true"
                     [bindValue]="key()"
                     [compareWith]="compareWith"
                     [editableSearchTerm]="true"
                     [items]="loadedList()"
                     [ngModel]="value"
                     [searchFn]="searchFn"
                     bindLabel="name"
                     notFoundText="Start typing to search">
              <ng-template let-item="item" ng-label-tmp>
                  {{ item?.name ?? item?.value ?? item }}
              </ng-template>
              <ng-template let-item="item" ng-option-tmp>
                  {{ item?.name ?? item?.value ?? item }}
              </ng-template>
              <ng-template let-searchTerm="searchTerm" ng-tag-tmp>
                  {{ searchTerm }}
              </ng-template>
          </ng-select>
      </div>
  `,
  imports: [
    NgSelectComponent,
    FormsModule,
    NgOptionTemplateDirective,
    NgLabelTemplateDirective,
    NgTagTemplateDirective
  ],
  styles: [
    `
      lg-autocomplete {
        display: flex;
        flex: 1;
        min-width: 150px;
      }

      .autocomplete {
        flex: 1;

        .ng-select.ng-select-single .ng-select-container {
          height: 51px;
        }

        .ng-select.ng-select-focused .ng-select-container {
          outline: none;
          box-shadow: var(--focus-shadow);
          border-radius: 12px;
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

        .ng-arrow-wrapper {
          display: none;
        }

        .ng-clear-wrapper {
          display: none;
        }
      }

    `
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class AutocompleteComponent
  implements ControlValueAccessor, OnInit {
  constructor(
    @Optional() private _selectResourcesService: SelectResourcesService,
  ) {
  }


  noLoad = input<boolean>(false);
  resource = input<string>('');
  key = input<string>('');
  strict = input<boolean>(false);
  loadedList = signal([]);
  onSelected = output<unknown>();
  selectComponent = viewChild(NgSelectComponent);
  value?: unknown = null
  initialList = signal<unknown[]>([]);
  private _onSearch$ = new Subject<{
    term: string
    items: unknown[]
  }>();
  private _currentSearchTerm: string | null = null;

  onChange: (value: unknown) => void = () => {
  };

  onTouched: () => void = () => {
  };

  searchFn = (term: string, item: MultiselectItem) => {
    const val = item as any;
    if (typeof val === 'string') {
      return val.toLowerCase().includes(term?.toLowerCase() ?? '');
    }
    return val.name?.toLowerCase().includes(term?.toLowerCase() ?? '')
  }

  compareWith = (a: autocompleteItem, b: autocompleteItem) => {
    const valA = a as any;
    const valB = b as any;

    console.log({
      valA,
      valB
    })

    if (!a || !b) {
      return false;
    }

    if (typeof valA !== 'string' && typeof valB !== 'string') {
      return valA?.name === valB?.name
        || valA?.uuid === valB?.uuid;
    }

    if (typeof valA === 'string' && typeof valB !== 'string') {
      return valA === valB?.name
        || valA === valB?.uuid;
    }

    if (typeof valA !== 'string' && typeof valB === 'string') {
      return valA?.name === valB
        || valA?.uuid === valB;
    }

    return false;
  }

  writeValue(value: unknown): void {
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
    const val = typeof value === 'string' ? value : (value as any)?.[this.key()];
    this.change(val);
    this.onSelected.emit(val);
  }

  onSearch(event: { term: string, items: unknown[] }) {
    if (!event.term) {
      this.writeValue('');
      return;
    }

    this._currentSearchTerm = event.term;

    if (!this.noLoad()) {
      this._onSearch$.next(event);
    }

    // Устанавливаем текущий запрос как тег, если нет найденных элементов
    if (event.items.length === 0) {
      this.loadedList.set([{name: event.term, value: event.term}] as any);
    } else {
      this.loadedList.set(event.items as any);
    }

    // Устанавливаем правильный текст в поиске
    this.selectComponent()!.searchTerm = this._capitalizeFirstLetter(event.term);
  }

  onBlur() {
    const select = this.selectComponent();
    if (select?.searchTerm) {
      // Принудительно добавить текущий searchTerm как тег
      const searchValue = select.searchTerm.trim();
      if (searchValue) {
        const tag = {name: searchValue, value: searchValue};
        this.loadedList.set([tag] as any)// заменить список, если нужно
        this.change(searchValue);   // обновить модель формы
        this.onSelected.emit(searchValue); // эмитнуть наружу
      }
    }
  }

  ngOnInit() {
    this._selectResourcesService.register(this.resource());

    this._onSearch$.asObservable().pipe(
      debounceTime(300),
    ).subscribe(event => {
      this._selectResourcesService.autocomplete(this.resource(), this.key(), event.term);
    });
    this._selectResourcesService.registryStream.pipe(
      switchMap((registry) => {
        const res = registry.get(this.resource());
        return res?.stream ?? of([]);
      }),
    ).subscribe(items => {
      this.loadedList.set(items as any);
      if (this.initialList().length) return;
      this.initialList.set(items as any);
    });
  }

  reload() {
    // return this._selectResourcesService.load([this.resource()]);
  }

  private _capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  focus() {
    const select = this.selectComponent();
    if (select) {
      select.focus();
    }
  }
}
