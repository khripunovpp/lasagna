import {AfterViewInit, Component, computed, inject, OnInit, signal, viewChild} from '@angular/core';

import {TitleComponent} from '../../../../shared/view/ui/layout/title/title.component';
import {AddProductFormComponent} from './add-product-form.component';
import {ActivatedRoute, Router} from '@angular/router';
import {FlexRowComponent} from '../../../../shared/view/ui/layout/flex-row.component';
import {FadeInComponent} from '../../../../shared/view/ui/fade-in.component';
import {DraftForm} from '../../../../shared/service/services/draft-forms.service';
import {ProductsRepository} from '../../service/products.repository';
import {NotificationsService} from '../../../../shared/service/services/notifications.service';
import {combineLatest, debounceTime, take} from 'rxjs';
import {ButtonComponent} from '../../../../shared/view/ui/layout/button.component';
import {ShrinkDirective} from '../../../../shared/view/directives/shrink.directive';
import {TimeAgoPipe} from '../../../../shared/view/pipes/time-ago.pipe';
import {CurrencyPipe} from '@angular/common';
import {Product} from '../../service/Product';
import {ProductDTO} from '../../service/Product.scheme';
import {ContainerComponent} from '../../../../shared/view/ui/layout/container/container.component';
import {TranslateDirective, TranslatePipe} from '@ngx-translate/core';
import {FlexColumnComponent} from '../../../../shared/view/ui/layout/flex-column.component';
import {UserCurrencyPipe} from '../../../../shared/view/pipes/userCurrency.pipe';
import {
  InlineSeparatedGroupComponent,
  InlineSeparatedGroupDirective
} from '../../../../shared/view/ui/inline-separated-group.component';
import {ROUTER_MANAGER} from '../../../../shared/service/providers/router-manager.provider';
import {AnalyticsService} from '../../../../shared/service/services/analytics.service';
import {SelfStartDirective} from '../../../../shared/view/directives/self-start.directive';
import {UnitStringPipe} from '../../../../shared/view/pipes/unitString.pipe';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [
    ContainerComponent,
    TitleComponent,
    AddProductFormComponent,
    FlexRowComponent,
    FadeInComponent,
    ButtonComponent,
    ShrinkDirective,
    TimeAgoPipe,
    TranslatePipe,
    FlexColumnComponent,
    UserCurrencyPipe,
    InlineSeparatedGroupComponent,
    InlineSeparatedGroupDirective,
    SelfStartDirective,
    UnitStringPipe,
    TranslateDirective
  ],
  template: `
    <lg-fade-in>
      <lg-container>
        <lg-flex-column size="medium">
          <lg-flex-row [center]="true" [mobileMode]="true">
            @if ((product()?.uuid && !draftRef()) || (draftRef() && draftByExistingProduct())) {
              <lg-title lgSelfStart>
                {{ product()?.name }}
              </lg-title>
            } @else {
              <lg-title lgSelfStart>
                {{ 'product.form.title'|translate }}
              </lg-title>
            }

            @if (product()?.pricePerUnit) {
              <span
                lgSelfStart>
                (<span [translate]="'per-unit.label'"
                       [translateParams]="{unit:product()?.unit | unitString | translate}"></span>
                {{ product()?.pricePerUnit | userCurrency:'1.0-5' }})
              </span>
            }
          </lg-flex-row>

          <lg-inline-separated-group>
            @if (draftRef() && formComponent()?.form?.dirty) {
              <ng-template lgInlineSeparatedGroup>
                <span>{{ 'saved-draft-label'|translate }}</span>
              </ng-template>
            }

            <ng-template lgInlineSeparatedGroup>
              @if (isDraftRoute()) {
                <lg-button lgShrink [style]="'danger'"
                           [flat]="true"
                           (click)="onRemoveDraft()">
                  {{ 'product.form.delete-draft-btn'|translate }}
                </lg-button>
              } @else if (product()?.uuid) {
                <lg-button lgShrink [style]="'danger'"
                           [flat]="true"
                           (click)="onDeleteProduct()">
                  {{ 'product.form.delete-btn'|translate }}
                </lg-button>
              }
            </ng-template>
          </lg-inline-separated-group>

          @if (product()?.updatedAt) {
            <small class="text-muted text-cursive">
              {{ 'edited-at-label'|translate }} {{ product()?.updatedAt | timeAgo }}
            </small>
          }

        </lg-flex-column>

        <lg-add-product-form [product]="product()"></lg-add-product-form>

        <lg-flex-row [mobileMode]="true" [relaxed]="true">
          @if ((product() && !draftRef()) || (draftRef() && draftByExistingProduct())) {
            <lg-button [disabled]="!formComponent()?.form?.dirty && !draftRef()"
                       lgShrink
                       (click)="onEditProduct()">
              @if (formComponent()?.form?.dirty || draftRef()) {
                {{ 'product.form.save-btn.edit.active'|translate }}
              } @else {
                {{ 'product.form.save-btn.edit.disabled'|translate }}
              }
            </lg-button>
          } @else {
            <lg-button lgShrink
                       [disabled]="!formComponent()?.form?.dirty && !draftRef()"
                       (click)="onAddProduct()">
              @if (formComponent()?.form?.dirty || draftRef()) {
                {{ 'product.form.save-btn.add.active'|translate }}
              } @else {
                {{ 'product.form.save-btn.add.disabled'|translate }}
              }
            </lg-button>
          }

        </lg-flex-row>
      </lg-container>
    </lg-fade-in>
  `,
  styles: [
    `
    `
  ],
  providers: [
    CurrencyPipe,
  ]
})
export class AddProductComponent
  implements OnInit, AfterViewInit {
  constructor(
    public _router: Router,
    private _aRoute: ActivatedRoute,
    private _productsRepository: ProductsRepository,
    private _notificationsService: NotificationsService,
    private _analyticsService: AnalyticsService,
  ) {
  }

  draftOrProductUUID = signal<string | undefined>(undefined);
  product = signal<Product | null>(null);
  formComponent = viewChild<AddProductFormComponent | null>(AddProductFormComponent);
  draftRef = signal<DraftForm<ProductDTO> | null>(null);
  draftByExistingProduct = computed(() => {
    return this.draftRef()!.meta?.['uuid'];
  });
  isDraftRoute = signal(false);
  private _routerManager = inject(ROUTER_MANAGER);

  ngOnDestroy() {
  }

  ngOnInit() {
    combineLatest([
      this._aRoute.params,
      this._aRoute.data,
    ]).pipe(take(1)).subscribe(([params, data]) => {
      this.draftOrProductUUID.set(params['uuid']);
      if (data['draft']) {
        this.draftRef.set(data['draft']);
        this.product.set(Product.fromRaw(data['draft'].data));
      } else if (this.draftOrProductUUID()) {
        this._loadProduct(this.draftOrProductUUID());
      } else {
        this.product.set(Product.empty());
      }
      this.isDraftRoute.set(!!data['draftRoute']);
    });
  }

  ngAfterViewInit() {

    this.formComponent()?.form.valueChanges.pipe(
      debounceTime(500),
    ).subscribe((value) => {
      if (!this.formComponent()!.form.dirty || !this.product()) {
        return
      }

      if (this.draftRef()?.uuid) {
        this._productsRepository.updateDraftProduct(
          this.draftRef()!.uuid,
          this.product()!,
          this.draftRef()!.meta?.['uuid']
        );
      } else if (this.product()) {
        this.draftRef.set(this._productsRepository.saveDraftProduct(
          this.product()!,
          this.draftOrProductUUID() ?? ''));

        if (!this.isDraftRoute()) {
          this._routerManager.replace(['products/draft/' + this.draftRef()!.uuid]);
        }
      }
    });
  }

  onAddProduct() {
    if (!this.formComponent()?.validateForm()
      || !this.product()) {
      return;
    }
    this._addProduct(this.product()!);
  }

  onEditProduct() {
    if (!this.formComponent()?.validateForm()
      || !this.product()) {
      return;
    }
    this._editProduct(this.product()!);
  }

  onRemoveDraft() {
    this._removeDraft();
    this._routerManager.navigate(['products']);
  }

  onDeleteProduct() {
    if (!this.product()?.uuid) {
      return;
    }
    this._productsRepository.deleteProduct(this.product()!.uuid!).then(() => {
      this._notificationsService.success('notifications.product.deleted');
      this._routerManager.navigate(['products']);
    });
  }

  private _addProduct(product: Product) {
    this._productsRepository.addOne(product).then((newUUID) => {
      // Track product creation analytics
      this._analyticsService.trackProductCreated(product.name, {
        product_uuid: newUUID,
        price_per_unit: product.pricePerUnit,
        unit: product.unit,
        category: product.category_id?.name
      });

      this.formComponent()?.resetForm();
      this._notificationsService.success('notifications.product.added');
      this.product.set(null);

      if (this.draftRef()) {
        this._removeDraft();
      }

      this._routerManager.replace(['products/edit/' + newUUID]);
    });
  }

  private _editProduct(product: Product) {
    if (!this.draftOrProductUUID()) {
      return;
    }
    let productUUID = this.draftRef()?.meta?.['uuid'] ?? this.draftOrProductUUID();
    this._productsRepository.updateOne(productUUID as string, product).then(() => {
      this.formComponent()?.resetForm(product);
      this._notificationsService.success('notifications.product.edited');

      if (this.draftRef()) {
        this._removeDraft();
      }

      this._routerManager.replace(['products', 'edit', productUUID]);
    });
  }

  private _removeDraft() {
    if (!this.draftRef()) {
      return;
    }
    this._productsRepository.removeDraftProduct(this.draftRef()!.uuid)
    this.draftRef.set(null);
  }

  private _loadProduct(uuid?: string) {
    if (!uuid) {
      return;
    }
    this._productsRepository.getOne(uuid, true).then(product => {
      if (!product) {
        return;
      }
      this.product.set(product);
    });
  }
}
