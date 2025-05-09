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
  NgMultiLabelTemplateDirective,
  NgOptionTemplateDirective,
  NgSelectComponent
} from '@ng-select/ng-select';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SelectResourcesService} from '../../../service/services/select-resources.service';
import {JsonPipe, NgStyle} from '@angular/common';
import {Tag} from '@service/models/Tag';


export interface TagsItem {
  value: unknown
}

@Component({
  selector: 'lg-tags-control',
  standalone: true,
  template: `
      <div class="tags-control">
          <ng-select (change)="onChangeSelect($event)"
                     (ngModelChange)="onChangeInput($event)"
                     [addTag]="addTagFn"
                     [appendTo]="'body'"
                     [compareWith]="compareWith"
                     [items]="loadedList()"
                     [multiple]="multi()"
                     [ngModel]="value"
                     [searchFn]="searchFn">
              <ng-template let-item="item" ng-label-tmp>
                  {{ $any(item)?.name ?? $any(item)?.label ?? item }}
              </ng-template>
              <ng-template let-item="item" ng-option-tmp>
                  {{ $any(item)?.name ?? $any(item)?.label ?? item }}
              </ng-template>
              <ng-template let-clear="clear" let-items="items" ng-multi-label-tmp>
                  @for (item of items;track $any(item)?.name ?? $any(item)?.label ?? item) {
                      <div class="ng-value"
                           [ngStyle]="{background: $any(item)?.color ? $any(item)?.color : null}">
                          <span class="ng-value-label">
                              {{ $any(item)?.name ?? $any(item)?.label ?? item }}
                          </span>
                          <span class="ng-value-icon right" (click)="clear(item)" aria-hidden="true">×</span>
                      </div>
                  }

              </ng-template>
          </ng-select>
      </div>
  `,
  imports: [
    NgSelectComponent,
    FormsModule,
    NgOptionTemplateDirective,
    NgLabelTemplateDirective,
    NgMultiLabelTemplateDirective,
    JsonPipe,
    NgStyle
  ],
  styles: [
    `
      lg-tags-control {
        display: flex;
        flex: 1;
        min-width: 150px;
      }

      .tags-control {
        flex: 1;

        .ng-select .ng-select-container {
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
      useExisting: forwardRef(() => TagsControlComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class TagsControlComponent
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

  addTagFn(name: string) {
    return Tag.fromRaw(name);
  };

  onChange: (value: unknown) => void = () => {
  };

  onTouched: () => void = () => {
  };

  searchFn = (term: string, item: TagsItem) => {
    const val = item as any;
    return val?.toString().toLowerCase().includes(term.toLowerCase())
  }

  compareWith = (a: TagsItem, b: TagsItem) => {
    const valA = a as any;
    const valB = b as any;

    return valA === valB
  }

  writeValue(value: unknown): void {
    this.change(value);
  }

  change(value: unknown) {
    if (Array.isArray(value)) {
      this.value = value.map((item) => Tag.fromRaw(item).toDTO());
    } else {
      this.value = Tag.fromRaw(value).toDTO();
    }
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
