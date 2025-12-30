import {Component, inject} from '@angular/core';
import {CardComponent} from '../../../shared/view/ui/card/card.component';
import {FlexColumnComponent} from '../../../shared/view/layout/flex-column.component';
import {TitleComponent} from '../../../shared/view/layout/title.component';
import {RecipesRepository} from '../../recipes/service/providers/recipes.repository';
import {combineLatestWith, defer, from, map, of} from 'rxjs';
import {ProductsRepository} from '../../products/service/products.repository';
import {TranslatePipe} from '@ngx-translate/core';
import {AsyncPipe, NgTemplateOutlet} from '@angular/common';
import {FlexRowComponent} from '../../../shared/view/layout/flex-row.component';
import {PullDirective} from '../../../shared/view/directives/pull.directive';
import {TimeAgoPipe} from '../../../shared/view/pipes/time-ago.pipe';
import {RouterLink} from '@angular/router';
import {productLabelFactoryProvider} from '../../../shared/factories/entity-labels/product.label.factory';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'lg-latest-widget',
  template: `
    <lg-card>
      <lg-flex-column size="medium">
        <lg-title [level]="4">{{ 'main.latest' | translate }}</lg-title>

        @let display = display$ | async;

        @if (display) {
          @if (displayProducts$ | async) {
            @let products = products$ | async;

            <lg-title [level]="5">{{ 'main.last-products' | translate }}</lg-title>

            <ng-container *ngTemplateOutlet="list; context:{
              $implicit: products?.latest,
              routeStartSegment: '/products/edit/',
              labelFactory: productLabelFactory
              }"></ng-container>
          }


          @if (displayRecipes$ | async) {
            @let recipes = recipes$ | async;

            <lg-title [level]="5">{{ 'main.last-recipes' | translate }}</lg-title>

            <ng-container *ngTemplateOutlet="list; context:{
              $implicit: recipes?.latest,
              routeStartSegment: '/recipes/edit/'
              }"></ng-container>
          }
        } @else {
          {{ 'no-latest-information' | translate }}
        }
      </lg-flex-column>
    </lg-card>

    <ng-template #list
                 let-items
                 let-labelFactory="labelFactory"
                 let-routeStartSegment="routeStartSegment">
      @for (item of (items || []); track item.uuid) {
        <lg-flex-row [size]="'medium'" [mobileMode]="true">
          <a [routerLink]="[routeStartSegment, item.uuid]"
             class="we">
            {{ labelFactory ? labelFactory(item) : item.name }}
          </a>

          <small class="text-muted text-right text-cursive" lgPull>
            {{ (item?.updatedAt) | timeAgo }}
          </small>
        </lg-flex-row>
      }
    </ng-template>
  `,
  imports: [
    CardComponent,
    FlexColumnComponent,
    TitleComponent,
    TranslatePipe,
    AsyncPipe,
    FlexRowComponent,
    PullDirective,
    TimeAgoPipe,
    RouterLink,
    NgTemplateOutlet
  ]
})
export class LatestWidgetComponent {
  constructor() {
  }

  readonly display$ = defer(() => this.displayRecipes$.pipe(
    combineLatestWith(this.displayProducts$),
    map(([recipes, products]) => recipes || products),
    catchError((err) => of(false)),
  ));
  protected readonly productLabelFactory = inject(productLabelFactoryProvider);
  private readonly _recipesRepository = inject(RecipesRepository);
  readonly recipes$ = from(this._recipesRepository.getLastRecipes()).pipe(
    combineLatestWith(from(this._recipesRepository.hasRecords())),
    map(([latest, existing]) => ({
      latest,
      existing,
    })),
  );
  readonly displayRecipes$ = this.recipes$.pipe(
    map(recipes => recipes.latest.length || recipes.existing)
  );
  private readonly _productsRepository = inject(ProductsRepository);
  readonly products$ = from(this._productsRepository.getLastProducts()).pipe(
    combineLatestWith(from(this._productsRepository.hasRecords())),
    map(([latest, existing]) => ({
      latest,
      existing,
    })),
  );
  readonly displayProducts$ = this.products$.pipe(
    map(products => products.latest.length || products.existing)
  );
}
