import {Component, effect, forwardRef, Input, output, signal, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'lg-entity-item-selector',
  standalone: true,
  template: `
    <div class="entity-item-selector">
      <div class="entity-item-selector__tabs">
        @for (item of items(); track item.slug; let last = $last, first = $first, index = $index) {
          <button class="entity-item-selector__tab"
                  [class.active]="activeIndex() === index"
                  (click)="onClickItem(item, index)">
            {{ item.title | translate }}
          </button>
        }
      </div>
      <div class="entity-item-selector__body">
        @for (item of items(); track item.slug; let last = $last, first = $first, index = $index) {
          <div class="entity-item-selector__part"
               (click)="onClickItem(item, index)"
               [class.active]="activeIndex() === index">
            <div class="entity-item-selector__control">
              @if (item.slug === 'custom') {
                <ng-content select="freeStyle"></ng-content>
              }
              @if (item.slug === 'product') {
                <ng-content select="products"></ng-content>
              }
              @if (item.slug === 'recipe') {
                <ng-content select="recipes"></ng-content>
              }
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .entity-item-selector {
        display: flex;
        flex-direction: column;
        position: relative;
        padding-top: 27px;
        --part-color-opacity: 0.5;

        &__tabs {
          display: flex;
          flex: 1;
          gap: 8px;
          position: absolute;
          z-index: 1;
          top: 0;
          left: 0;
          width: 100%;
          white-space: nowrap;
        }

        &__tab {
          background-color: var(--part-color);
          padding: 4px 12px;
          border-radius: 8px 8px 0 0;
          cursor: pointer;
          opacity: var(--part-color-opacity, 0.2);
          appearance: none;
          color: inherit;
          border: none;
          font-family: inherit;
          font-weight: 400;
          font-size: 16px;
          transform: translateY(9px) scale(0.95);
          transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;

          &.active,
          &:hover {
            --part-color-opacity: 1;
            transform: translateY(0) scale(1);
          }

          &:focus {
            outline: none;
            box-shadow: var(--focus-shadow);
            --part-color-opacity: 0.7;
            transform: translateY(0) scale(1);
          }
        }

        &__body {
          background-color: var(--control-bg);
          border-radius: 0 12px 12px 12px;
          gap: 16px;
          position: relative;
          z-index: 2;
        }

        &__control {
          display: none;
          flex: 1;
          width: 100%;
        }

        &__part,
        &__tab {
          &:nth-child(1) {
            --part-color: rgba(105, 185, 255, var(--part-color-opacity, 0.5));
          }

          &:nth-child(2) {
            --part-color: rgba(108, 190, 108, var(--part-color-opacity, 0.5));
          }

          &:nth-child(3) {
            --part-color: rgba(198, 213, 255, var(--part-color-opacity, 0.5));
          }
        }

        &__part {
          display: flex;

          &.active {
            flex: 1;


            .entity-item-selector__control {
              display: block;
            }
          }
        }
      }
    `
  ],
  imports: [TranslatePipe],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntityItemSelectorComponent),
      multi: true
    }
  ]
})
export class EntityItemSelectorComponent
  implements ControlValueAccessor {
  @Input() flat = false;
  items = signal<{
    slug: string
    title: string
  }[]>([
    {
      slug: 'recipe',
      title: 'entity-item.selector.recipe',
    },
    {
      slug: 'product',
      title: 'entity-item.selector.product',
    },
  ]);
  activeIndex = signal<number>(0);
  value = signal<string>('');
  onChanged = output<string>();
  effect = effect(() => {
    const activeIndex = this.items()?.findIndex(item => item.slug === this.value()) ?? -1;
    this.activeIndex.set(activeIndex === -1 ? 0 : activeIndex);
  });

  onClickItem(item: any, index: number) {
    this.activeIndex.set(index);
    this.writeValue(item.slug);
    this.onChanged.emit(item.slug);
    item.onClick?.();
  }

  onChange: (value: string) => void = () => {
  };
  onTouched: () => void = () => {
  };

  writeValue(value: string): void {
    this._change(value);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  private _change(value: string) {
    this.value.set(value);
    this.onChange(this.value());
  }
}
