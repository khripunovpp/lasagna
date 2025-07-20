import {AfterViewInit, Component, computed, effect, inject, OnInit, Renderer2, signal, viewChild} from '@angular/core';

import {TitleComponent} from '../../../../shared/view/ui/layout/title/title.component';
import {AddProductFormComponent} from './add-product-form.component';
import {ActivatedRoute, Router} from '@angular/router';
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
import {TranslatePipe} from '@ngx-translate/core';
import {UserCurrencyPipe} from '../../../../shared/view/pipes/userCurrency.pipe';
import {
  InlineSeparatedGroupComponent,
  InlineSeparatedGroupDirective
} from '../../../../shared/view/ui/inline-separated-group.component';
import {SyncSingleButtonComponent} from '../../../api/sync-button.component';
import {FlexColumnComponent} from '../../../../shared/view/ui/layout/flex-column.component';
import {FlexRowComponent} from '../../../../shared/view/ui/layout/flex-row.component';
import {CloudSyncService} from '../../../api/cloud-sync.service';
import {Stores} from '../../../../shared/service/db/const/stores';
import {errorHandler} from '../../../../shared/helpers';
import {ROUTER_MANAGER} from '../../../../shared/service/providers/router-manager.provider';
import {AnalyticsService} from '../../../../shared/service/analytics.service';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [
    ContainerComponent,
    TitleComponent,
    AddProductFormComponent,
    FadeInComponent,
    ButtonComponent,
    ShrinkDirective,
    TimeAgoPipe,
    TranslatePipe,
    UserCurrencyPipe,
    InlineSeparatedGroupComponent,
    InlineSeparatedGroupDirective,
    SyncSingleButtonComponent,
    FlexColumnComponent,
    FlexRowComponent
  ],
  template: `
    <lg-fade-in>
      <lg-container>
        <lg-flex-column size="medium">
          <lg-flex-row [center]="true" [mobileMode]="true">
            @if ((product()?.uuid && !draftRef()) || (draftRef() && draftByExistingProduct())) {
              <lg-title>
                {{ product()?.name }}
              </lg-title>
            } @else {
              <lg-title>
                {{ 'product.form.title'|translate }}
              </lg-title>
            }

            @if (product()?.pricePerUnit) {
              ({{ product()?.perUnitLabel }} {{ product()?.pricePerUnit | userCurrency:'1.0-5' }})
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

          <lg-flex-row [center]="true">
            @if (product()?.updatedAt) {
              <small class="text-muted text-cursive">
                {{ 'edited-at-label'|translate }} {{ product()?.updatedAt | timeAgo }}
              </small>
            }

            @if (product()?.uuid) {
              <lg-sync-single-button (onClick)="sync()"
                                     [needSync]="!!product()?.needSync()"></lg-sync-single-button>
            }
          </lg-flex-row>
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
    private _renderer: Renderer2,
    private _cloudSyncService: CloudSyncService,
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
  productEffect = effect(() => {
    if (this.product()) {
      this._renderer.setProperty(document.body, 'style', `--background-color: ${this.product()!.ownColor}`);
    } else {
      this._renderer.removeAttribute(document.body, 'style');
    }
  });
  protected readonly Stores = Stores;
  private _routerManager = inject(ROUTER_MANAGER);

  async sync() {
    try {
      debugger
      if (!this.product()?.uuid) {
        return;
      }

      await this._productsRepository.safetyPutToCloud(Stores.PRODUCTS, this.product()!);
    } catch (error) {
      this._notificationsService.error(errorHandler(error));
    }
  }

  ngOnDestroy() {
    this._renderer.removeAttribute(document.body, 'style');
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
    this._productsRepository.deleteOne(this.product()!.uuid!).then(() => {
      this._notificationsService.success('Product deleted');
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
      this._notificationsService.success('Product added');
      this.product.set(null);

      if (this.draftRef()) {
        this._removeDraft();
      }

      this._routerManager.navigateWithReset(['products/edit/' + newUUID]);
    }).catch((error) => {
      this._notificationsService.error(errorHandler(error));
    })
  }

  private _editProduct(product: Product) {
    if (!this.draftOrProductUUID()) {
      return;
    }
    let productUUID = this.draftRef()?.meta?.['uuid'] ?? this.draftOrProductUUID();
    this._productsRepository.replaceOne(productUUID as string, product).then(() => {
      this.formComponent()?.resetForm(product);
      this._notificationsService.success('Product edited');

      if (this.draftRef()) {
        this._removeDraft();
      }

      this._routerManager.navigateWithReset(['products', 'edit', productUUID]);
    }).catch((error) => {
      this._notificationsService.error(errorHandler(error));
    })
  }

  private _removeDraft() {
    if (!this.draftRef()) {
      return;
    }
    this._productsRepository.removeDraftProduct(this.draftRef()!.uuid).then(() => {
      this.draftRef.set(null);
    }).catch((error) => {
      this._notificationsService.error(errorHandler(error));
    });
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
    }).catch((error) => {
      this._notificationsService.error(errorHandler(error));
    })
  }
}
